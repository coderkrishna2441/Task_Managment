from rest_framework import serializers
from api.models import Tasks


class TasksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields = ('id','Status','Author', 'Create_at', 'Title', 'Content', 'StartTime', 'EndTime')

    def to_representation(self, instance):
        response = super().to_representation(instance)
        # Include all fields in the response, even if not changed
        return response