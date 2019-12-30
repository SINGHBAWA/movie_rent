from  rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.decorators import action

from .models import Movie, MovieCart, MovieOrder
from .serializers import MovieSerializer, MovieCartSerializer, MovieOrderSerializer


class MovieView(viewsets.ModelViewSet):
    model = Movie
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer


class MovieCartView(viewsets.ModelViewSet):
    model = MovieCart
    queryset = MovieCart.objects.all()
    serializer_class = MovieCartSerializer

    @action(detail=False, methods=['DELETE'])
    def remove(self, request):
        cart_item = MovieCart.objects.get(movie_id=request.data['movie'], user_id=request.user)
        cart_item.delete()
        return Response({"removed": True}, status=status.HTTP_200_OK)


class MovieOrderView(viewsets.ModelViewSet):
    model = MovieOrder
    queryset = MovieOrder.objects.all()
    serializer_class = MovieOrderSerializer

