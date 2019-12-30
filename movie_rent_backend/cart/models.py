from django.db import models
from django.contrib.auth.models import User
# Create your models here.
import random
import string


def randomString(stringLength=10):
    """Generate a random string of fixed length """
    letters = string.ascii_uppercase
    return ''.join(random.choice(letters) for i in range(stringLength))


class Movie(models.Model):
    Rank = models.IntegerField(null=True, blank=True, unique=True)
    Title = models.CharField(max_length=100, null=True, blank=True)
    Genre = models.CharField(max_length=100, null=True, blank=True)
    Description = models.CharField(max_length=1500, null=True, blank=True)
    Director = models.CharField(max_length=100, null=True, blank=True)
    Actors = models.CharField(max_length=100, null=True, blank=True)
    Year = models.IntegerField(null=True, blank=True)
    Runtime = models.IntegerField(null=True, blank=True)
    Votes = models.IntegerField(null=True, blank=True)
    Rating = models.DecimalField(decimal_places=2, max_digits=5, null=True, blank=True)
    Revenue = models.DecimalField(decimal_places=2, max_digits=10, null=True, blank=True)
    Metascore = models.IntegerField( null=True, blank=True)


class MovieCart(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    hours = models.IntegerField(default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)


class MovieOrder(models.Model):
    order_number = models.CharField(default=randomString(), max_length=12)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    total = models.DecimalField(max_digits=10, decimal_places=2)


class MovieOrderDetail(models.Model):
    order = models.ForeignKey(MovieOrder, related_name='movies', on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    hours = models.IntegerField()
