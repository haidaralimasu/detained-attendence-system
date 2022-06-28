from django.urls import path
from .views import DayListView, DayDetailView, DayFeaturedView

urlpatterns = [
    path('', DayListView.as_view()),
    path('featured', DayFeaturedView.as_view()),
    path('<slug>', DayDetailView.as_view()),
]
