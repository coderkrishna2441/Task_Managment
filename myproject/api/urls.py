from django.urls import path
from api.views import AddTaskView, DeleteTaskView, ShowTaskView,EndTaskView

urlpatterns = [
    path('add/', AddTaskView.as_view(), name='add_task'),
    path('delete/<int:task_id>/', DeleteTaskView.as_view(), name='delete_task'),
    path('show/', ShowTaskView.as_view(), name='show_tasks'),
    path('end/<int:task_id>/', EndTaskView.as_view(), name='end_task'),
]