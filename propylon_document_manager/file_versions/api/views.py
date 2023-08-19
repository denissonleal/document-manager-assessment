from django.db.models import Max
from rest_framework import status
from rest_framework.response import Response
from rest_framework.mixins import RetrieveModelMixin, ListModelMixin, CreateModelMixin
from rest_framework.viewsets import GenericViewSet
from rest_framework.parsers import MultiPartParser
from file_versions.models import FileVersion
from .serializers import FileVersionSerializer


class FileVersionViewSet(CreateModelMixin, RetrieveModelMixin, ListModelMixin, GenericViewSet):
    authentication_classes = []
    permission_classes = []
    serializer_class = FileVersionSerializer
    queryset = FileVersion.objects.all()
    parser_classes = (MultiPartParser,)

    def get_queryset(self):
        queryset = super().get_queryset()

        filename = self.request.query_params.get('file_name')
        queryset = queryset.filter(file_name=filename)
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
