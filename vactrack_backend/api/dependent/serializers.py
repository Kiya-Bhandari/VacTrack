from rest_framework import serializers
from api.dependent.models import Dependent

class DependentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Dependent
        fields = '__all__'
