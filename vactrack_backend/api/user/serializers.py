"""
serializers module

helps in serialization and deserialization for CustomUser model
"""
# from rest_framework import serializers
# from api.user.models import CustomUser


# class UserSignUpSerializer(serializers.Serializer):
#     firstname = serializers.CharField(required=True)
#     lastname = serializers.CharField(required=True)
#     email = serializers.EmailField(required=True)
#     password = serializers.CharField(required=True)


# class UserSerializer(serializers.HyperlinkedModelSerializer):
#     """
#     A class that helps in serializing and deserializing

#     ...

#     Attributes
#     ----------
#     None

#     Methods
#     -------
#     create(validated_data)
#         creates the new CustomUser

#     update(instance, validated_data)
#         updates the existing CustomUser

#     """

#     def create(self, validated_data):
#         password = validated_data.pop('password')
#         instance = self.Meta.model(**validated_data)

#         if password is not None:
#             instance.set_password(password)
#         instance.save()
#         return instance

#     def update(self, instance, validated_data):
#         for attr, value in validated_data.items():
#             if attr == 'password':
#                 instance.set_password(value)
#             else:
#                 setattr(instance, attr, value)

#         instance.save()
#         return instance

#     class Meta:
#         """
#         A class that defines the fields to be serialized

#         ...

#         Attributes
#         ----------
#         model: CustomUser
#             model to be serialized

#         extra_kwargs: dict
#             a dictionary containing extra keyword arguments

#         fields: tuple
#             a tuple of fields to be serialized
#         """
#         model = CustomUser
#         extra_kwargs = {'password': {'write_only': True}}
#         fields = ('first_name', 'last_name', 'email', 'password',
#                   'role_id', 'is_locked', 'last_login')
