from datetime import datetime
from day.models import Day
from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()


class Student(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    day = models.ForeignKey(Day, on_delete=models.CASCADE)
    comment = models.TextField()
    is_present = models.BooleanField(default=False)
    date_created = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return self.comment
