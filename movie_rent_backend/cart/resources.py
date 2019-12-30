from import_export import resources
from .models import Movie

class PersonResource(resources.ModelResource):
    class Meta:
        model = Movie