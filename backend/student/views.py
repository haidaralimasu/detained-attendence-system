from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from day.models import Day
from .models import Student


class GetDayAttendencesView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, daySlug, format=None):
        try:
            day_slug = daySlug
        except:
            return Response(
                {'error': 'Day ID must be an integer'},
                status=status.HTTP_404_NOT_FOUND
            )

        try:
            if not Day.objects.filter(slug=day_slug).exists():
                return Response(
                    {'error': 'This day does not exist'},
                    status=status.HTTP_404_NOT_FOUND
                )

            day = Day.objects.get(slug=day_slug)

            results = []

            if Student.objects.filter(day=day).exists():
                students = Student.objects.order_by(
                    '-date_created'
                ).filter(day=day)

                for student in students:
                    item = {}

                    item['id'] = student.id
                    item['comment'] = student.comment
                    item['date_created'] = student.date_created
                    item['user'] = student.user.username
                    item['is_present'] = student.is_present

                    results.append(item)

            return Response(
                {'students': results},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Something went wrong when retrieving comments'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class GetDayAttendenceView(APIView):
    def get(self, request, daySlug, format=None):
        user = self.request.user

        try:
            day_slug = daySlug
        except:
            return Response(
                {'error': 'day ID must be an integer'},
                status=status.HTTP_404_NOT_FOUND
            )

        try:
            if not Day.objects.filter(slug=day_slug).exists():
                return Response(
                    {'error': 'This day does not exist'},
                    status=status.HTTP_404_NOT_FOUND
                )

            day = Day.objects.get(slug=day_slug)

            result = {}

            if Student.objects.filter(user=user, day=day).exists():
                student = Student.objects.get(user=user, day=day)

                result['id'] = student.id
                result['comment'] = student.comment
                result['date_created'] = student.date_created
                result['user'] = student.user.username
                result['is_present'] = student.is_present

            return Response(
                {'student': result},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Something went wrong when retrieving comment'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class CreateAttendenceView(APIView):
    def post(self, request, daySlug, format=None):
        user = self.request.user
        data = self.request.data

        try:
            day_slug = daySlug
        except:
            return Response(
                {'error': 'day ID must be an integer'},
                status=status.HTTP_404_NOT_FOUND
            )

        try:
            comment = str(data['comment'])
        except:
            return Response(
                {'error': 'Must pass a comment when creating comment'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            if not Day.objects.filter(slug=day_slug).exists():
                return Response(
                    {'error': 'This  does not exist'},
                    status=status.HTTP_404_NOT_FOUND
                )

            day = Day.objects.get(slug=day_slug)

            result = {}
            results = []

            # if Student.objects.filter(user=user, day=day).exists():
            #     return Response(
            #         {'error': 'day for this  already created'},
            #         status=status.HTTP_409_CONFLICT
            #     )

            student = Student.objects.create(
                user=user,
                day=day,
                comment=comment,
                is_present=False
            )

            if Student.objects.filter(user=user, day=day).exists():
                result['id'] = comment.id
                result['comment'] = comment.comment
                result['date_created'] = comment.date_created
                result['user'] = comment.user.first_name
                result['is_present'] = comment.is_present

                students = Student.objects.order_by('-date_created').filter(
                    day=day
                )

                for student in students:
                    item = {}

                    item['id'] = student.id
                    item['comment'] = student.comment
                    item['date_created'] = student.date_created
                    item['user'] = student.user.username

                    results.append(item)

            return Response(
                {'student': result, 'students': results},
                status=status.HTTP_201_CREATED
            )
        except:
            return Response(
                {'error': 'Something went wrong when creating comment'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
