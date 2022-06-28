from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.generics import ListAPIView, RetrieveAPIView
from .models import Day
from .serializers import DaySerializer


class DayListView(ListAPIView):
    queryset = Day.objects.order_by('-date_created')
    serializer_class = DaySerializer
    lookup_field = 'slug'
    permission_classes = (permissions.AllowAny, )


class DayDetailView(RetrieveAPIView):
    queryset = Day.objects.order_by('-date_created')
    serializer_class = DaySerializer
    lookup_field = 'slug'
    permission_classes = (permissions.AllowAny, )


class DayFeaturedView(ListAPIView):
    queryset = Day.objects.all().filter(featured=True)
    serializer_class = DaySerializer
    lookup_field = 'slug'
    permission_classes = (permissions.AllowAny, )
