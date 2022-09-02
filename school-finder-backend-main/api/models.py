from django.db import models

# Create your models here.


class School(models.Model):
    name = models.CharField(max_length=100)
    level = models.CharField(max_length=20)
    address = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=6)
    latitude = models.FloatField()
    longitude = models.FloatField()
    website_url = models.URLField()
    email_address = models.EmailField()
    telephone_no = models.CharField(max_length=10)
    ccas = models.JSONField(null=True, blank=True)
    subjects = models.JSONField(null=True, blank=True)
    cutoff = models.JSONField(null=True, blank=True)
    courses = models.JSONField(null=True, blank=True)
    distance = models.FloatField(default=-1)
    eta = models.FloatField(default=-1)

    def __str__(self):
        return self.name
