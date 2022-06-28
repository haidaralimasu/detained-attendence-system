from django.db import models
from datetime import datetime
from django.template.defaultfilters import slugify


class Day(models.Model):
    title = models.CharField(max_length=50)
    slug = models.SlugField()
    featured = models.BooleanField(default=True)
    date_created = models.DateTimeField(default=datetime.now, blank=True)

    def save(self, *args, **kwargs):
        original_slug = slugify(self.title)
        queryset = Day.objects.all().filter(slug__iexact=original_slug).count()

        count = 1
        slug = original_slug
        while(queryset):
            slug = original_slug + '-' + str(count)
            count += 1
            queryset = Day.objects.all().filter(slug__iexact=slug).count()

        self.slug = slug

        if self.featured:
            try:
                temp = Day.objects.get(featured=True)
                if self != temp:
                    temp.featured = False
                    temp.save()
            except Day.DoesNotExist:
                pass

        super(Day, self).save(*args, **kwargs)

    def __str__(self):
        return self.title
