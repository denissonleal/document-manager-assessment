from rest_framework import serializers

from file_versions.models import FileVersion

class FileVersionSerializer(serializers.ModelSerializer):
    file_name = serializers.CharField(max_length=512)
    version_number = serializers.IntegerField(required=False)

    def validate_file_name(self, value):
    #     # if not value:
    #     #     raise serializers.ValidationError("url_setted cannot be empty")

    #     # # verify quotes
    #     # if '"' in value or "'" in value:
    #     #     raise serializers.ValidationError("url_setted cannot contain quotes")

    #     # # verfy start with slash
    #     # if value.startswith('/'):
    #     #     value = value[1:]

    #     # # verify end with slash
    #     # if value.endswith('/'):
    #     #     value = value[:-1]

        return value

    class Meta:
        model = FileVersion
        fields = "__all__"
