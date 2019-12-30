from rest_framework import serializers
from cart.models import Movie, MovieCart, MovieOrder, MovieOrderDetail


class MovieSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movie
        fields = "__all__"


class MovieOrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieOrderDetail
        fields = ['movie', 'hours']


class MovieOrderSerializer(serializers.ModelSerializer):
    movies = MovieOrderDetailSerializer(many=True, required=False)

    class Meta:
        model = MovieOrder
        fields = ['user', 'total', 'movies']
        extra_kwargs = {'order_number': {'read_only': True}, 'user': {'required': False}}

    def create(self, validated_data):
        movies = validated_data.pop('movies')
        order = MovieOrder.objects.create(**validated_data)
        for movie_data in movies:
            MovieOrderDetail.objects.create(order=order, **movie_data)

        cart_items = MovieCart.objects.all()
        cart_items.delete()
        return order


class MovieCartSerializer(serializers.ModelSerializer):
    movie = MovieSerializer(read_only=True)
    movie_id = serializers.PrimaryKeyRelatedField(source="movie", queryset=Movie.objects.all(), write_only=True)

    class Meta:
        model = MovieCart
        fields = "__all__"
        extra_kwargs = {'user': {'required': False}}

    def create(self, data):
        user = data.get('user')
        movie = data.get('movie')
        cart_item, created = MovieCart.objects.get_or_create(movie=movie)
        if user:
            cart_item.user = user
        cart_item.hours += int(data['hours'])
        cart_item.save()
        return cart_item
