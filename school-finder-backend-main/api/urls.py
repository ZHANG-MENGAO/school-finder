from django.urls import path
# from .views import schoolList, schoolDetail, schoolFilter, getDist, reset
from .views import schoolList, schoolDetail, schoolFilter, getDist, DistanceView, reset

urlpatterns = [
    path('schoolList/', schoolList),
    path('schoolDetail/<int:pk>/', schoolDetail),
    path('schoolFilter/', schoolFilter.as_view()),
    path('getdist/', getDist),
    path('init/<str:origin>/', DistanceView.as_view()),
    path('reset/', reset)
]
