from rest_framework import serializers

from file_versions.models import FileVersion

class FileVersionSerializer(serializers.ModelSerializer):
    file_name = serializers.CharField(max_length=512)
    version_number = serializers.IntegerField(required=False)
    user = serializers.CharField(required=False)

    class Meta:
        model = FileVersion
        fields = "__all__"
