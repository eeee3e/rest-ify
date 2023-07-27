from rest_framework import serializers
from accounts.models import User
from django.contrib.auth.password_validation import validate_password

class SignUpSerializer(serializers.ModelSerializer):
    
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name', 'phone_number', 'avatar')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'phone_number': {'required': True},
            'avatar': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            phone_number=validated_data['phone_number'],
            avatar=validated_data['avatar'],
        )

        
        user.set_password(validated_data['password'])
        user.save()
        return user



class EditSerializer(serializers.ModelSerializer):
    

    
    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'phone_number', 'avatar')

    
    
    
    