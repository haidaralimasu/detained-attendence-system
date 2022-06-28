from django.urls import path
from .views import *

urlpatterns = [
    path('get-attendences/<daySlug>', GetDayAttendencesView.as_view()),
    path('get-attendence/<daySlug>', GetDayAttendenceView.as_view()),
    path('create-attendence/<daySlug>', CreateAttendenceView.as_view()),
]
