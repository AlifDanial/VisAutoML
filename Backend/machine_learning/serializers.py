from rest_framework import serializers
from .models import Model, ModelDescription


class ModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Model
        fields = "__all__"
        read_only_fields = ["overall_score", ]


class ModelDescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelDescription
        fields = "__all__"
        read_only_fields = ["model", ]
