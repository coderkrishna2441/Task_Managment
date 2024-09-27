import json
from rest_framework.response import Response
from .models import Tasks
from .serializer import TasksSerializer  # Assuming you have a serializer defined
from rest_framework.views import APIView
from rest_framework import status

class ShowTaskView(APIView):
    def get(self, request):
        tasks = Tasks.objects.all()
        serializer = TasksSerializer(tasks, many=True)
        return Response(serializer.data)

class AddTaskView(APIView):
    def post(self, request):
        try:
            task_data = json.loads(request.body)
            serializer = TasksSerializer(data=task_data)
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'Task created successfully'})
            else:
                return Response({'error': serializer.errors}, status=400)
        except Exception as e:
            return Response({'error': str(e)}, status=400)

class DeleteTaskView(APIView):
    def get_object(self, pk):
        try:
            return Tasks.objects.get(pk=pk)
        except Tasks.DoesNotExist:
            return None

    def delete(self, request, task_id):
        task = self.get_object(task_id)
        if not task:
            return Response({'error': 'Task not found'})

        task.delete()
        return Response({'message': 'Task deleted successfully'})
    

class EndTaskView(APIView):
  def patch(self, request, task_id):
    try:
      task = Tasks.objects.get(pk=task_id)  # Use pk (primary key) for clarity
    except Tasks.DoesNotExist:
      return Response({'error': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = TasksSerializer(task, data=request.data, partial=True)  # Update only relevant fields
    if serializer.is_valid():
      serializer.save()
      return Response({'message': 'Task ended successfully'})
    else:
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)