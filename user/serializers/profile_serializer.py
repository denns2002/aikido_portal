# from django.contrib.auth.tokens import PasswordResetTokenGenerator
# from django.utils.encoding import force_str
# from django.utils.http import urlsafe_base64_decode
# from django_countries.serializer_fields import CountryField
# from django_countries import countries
# from rest_framework import serializers
# from rest_framework_simplejwt.exceptions import AuthenticationFailed
# from phonenumber_field.serializerfields import PhoneNumberField
#
# from user.models.departments import Department
# from user.models.phone import Phone
# from user.models.role import Role
# from user.models.tags import Tag
# from user.models.user import User
#
#
# class ProfileSerializer(serializers.Serializer):
#     username = serializers.CharField(max_length=255)
#     email = serializers.EmailField(max_length=68)
#     is_head = serializers.BooleanField()
#     first_name = serializers.CharField()
#     last_name = serializers.CharField()
#     birth_date = serializers.DateField()
#     country = CountryField(name_only=True)
#     photo = serializers.ImageField()
#     phone_one = PhoneNumberField()
#     phone_two = PhoneNumberField()
#     phone_set = PhoneSerializer(many=True, read_only=True)
#     departments = DepartmentSerializer(read_only=True)
#     head_of_department = DepartmentSerializer(source='department',
#                                               read_only=True)
#     about_me = serializers.CharField()
#     tags = TagSerializer(many=True)
#     roles = RoleSerializer(many=True)
#
#     class Meta:
#         model = User
#         fields = ('1',)
#
#
# class UpdateUserSerializer(serializers.ModelSerializer):
#     email = serializers.EmailField(required=False)
#     first_name = serializers.CharField(required=False)
#     last_name = serializers.CharField(required=False)
#     username = serializers.CharField(required=False)
#     birth_date = serializers.DateField(required=False)
#     photo = serializers.ImageField(required=False)
#     country = CountryField(required=False)
#     about_me = serializers.CharField(required=False)
#     phone_one = PhoneNumberField(required=False)
#     phone_two = PhoneNumberField(required=False)
#
#     class Meta:
#         model = User
#         fields = [
#             'email', 'first_name', 'last_name', 'username', 'birth_date',
#             'photo', 'country', 'about_me', 'phone_one', 'phone_two'
#         ]
#
#     def validate_email(self, value):
#         user = self.context['request'].user
#         if User.objects.exclude(pk=user.pk).filter(email=value).exists():
#             raise serializers.ValidationError({"email": "This email is already in use."})
#         return value
#
#     def validate_username(self, value):
#         user = self.context['request'].user
#         if User.objects.exclude(pk=user.pk).filter(username=value).exists():
#             raise serializers.ValidationError({"username": "This username is already in use."})
#         return value
#
#     def update(self, instance, validated_data):
#         user = self.context['request'].user
#
#         if user.pk != instance.pk:
#             raise serializers.ValidationError(
#                 {"authorize": "You dont have permission for this user."})
#
#         if 'first_name' in validated_data:
#             instance.first_name = validated_data['first_name']
#         if 'last_name' in validated_data:
#             instance.last_name = validated_data['last_name']
#         if 'email' in validated_data:
#             instance.email = validated_data['email']
#         if 'username' in validated_data:
#             instance.username = validated_data['username']
#         if 'country' in validated_data:
#             for code, name in countries.countries.items():
#                 if code == validated_data['country']:
#                     instance.country = code
#         if 'about_me' in validated_data:
#             instance.about_me = validated_data['about_me']
#         if 'photo' in validated_data:
#             instance.photo = validated_data['photo']
#         if 'birth_date' in validated_data:
#             instance.birth_date = validated_data['birth_date']
#         if 'phone_one' in validated_data:
#             instance.phone_one = validated_data['phone_one']
#         if 'phone_two' in validated_data:
#             instance.phone_two = validated_data['phone_two']
#
#         instance.save()
#
#         return