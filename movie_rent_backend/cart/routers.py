from rest_framework import routers
from .views import MovieView, MovieCartView, MovieOrderView
router = routers.DefaultRouter()
router.register(r'movies', MovieView, basename='movie')
router.register(r'movie_cart', MovieCartView, basename='movie_cart')
router.register(r'movie_order', MovieOrderView, basename='movie_order')