from django.db import models


class Tasks(models.Model):
    id = models.AutoField(primary_key=True)
    Author = models.CharField(max_length=100)
    Create_at = models.DateField(auto_now=True)
    Title = models.CharField(max_length=40)
    Content = models.TextField()
    StartTime = models.TimeField(auto_now_add=True)
    EndTime = models.TimeField(auto_now_add=True)
    Status = models.BooleanField()

    def __str__(self):
        return self.Title