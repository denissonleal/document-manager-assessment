from django.db import models
import os
import uuid
from propylon_document_manager.users.models import User

def generate_bin_path(instance, filename):
    base_filename, file_extension = os.path.splitext(filename)
    bin_path = str(uuid.uuid4()) + file_extension

    return os.path.join('documents/', bin_path)

class FileVersion(models.Model):
    file_name = models.fields.CharField(max_length=512)
    version_number = models.fields.IntegerField()
    file = models.FileField(upload_to=generate_bin_path)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
