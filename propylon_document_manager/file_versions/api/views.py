from django.db.models import Max, F
from rest_framework import status
from rest_framework.response import Response
from rest_framework.mixins import ListModelMixin, CreateModelMixin
from rest_framework.viewsets import GenericViewSet
from rest_framework.parsers import MultiPartParser
from file_versions.models import FileVersion
from .serializers import FileVersionSerializer
from rest_framework.generics import RetrieveAPIView
import mimetypes
from django.http import HttpResponse
from django.db.models import OuterRef, Subquery
from django.db.models.functions import Coalesce
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

class FileVersionViewSet(RetrieveAPIView, CreateModelMixin, ListModelMixin, GenericViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = FileVersionSerializer
    queryset = FileVersion.objects.all()
    parser_classes = (MultiPartParser,)

    def get_queryset(self):
        queryset = super().get_queryset()

        # filter user requests
        queryset = queryset.filter(user=self.request.user)

        filename = self.request.query_params.get('file_name')
        if self.action != "retrieve" and filename:
            queryset = queryset.filter(file_name=filename)

        if self.action != "retrieve" and not filename:
            subquery = FileVersion.objects.filter(
                file_name=OuterRef('file_name')
            ).order_by('-version_number').values('version_number')[:1]

            queryset = queryset.annotate(
                bigger_version=Coalesce(Subquery(subquery), 0)
            ).filter(version_number=F('bigger_version'))

            queryset = queryset.order_by('file_name')
        else:
            queryset = queryset.order_by('-id')

        return queryset

    def create(self, request):
        serializer = self.serializer_class(data = request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        file = request.FILES['file']
        if not file:
            return Response('Please select a valid file', status=status.HTTP_400_BAD_REQUEST)

        file_name = request.data.get('file_name')
        if not file_name:
            return Response('Please select a valid file', status=status.HTTP_400_BAD_REQUEST)

        version_number = FileVersion.objects.filter(
            file_name=file_name
        ).aggregate(Max('version_number'))['version_number__max']

        if version_number is None:
            version_number = 0

        file_version = serializer.save(
            version_number=version_number+1,
            file_name=file_name,
        )

        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        file_path = instance.file.path
        mime_type, _ = mimetypes.guess_type(file_path)

        with open(file_path, 'rb') as file:
            file_content = file.read()
        response = HttpResponse(file_content, content_type=mime_type)
        response['Content-Disposition'] = f'attachment; filename="{instance.file_name}"'

        return response
