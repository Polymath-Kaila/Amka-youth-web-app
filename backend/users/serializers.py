from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.utils.text import slugify
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    interests = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id", "username", "first_name", "last_name",
            "email", "phone", "region", "age", "gender", "interests"
        ]

    def get_interests(self, obj):
        # return list form for frontend
        if not getattr(obj, "interests", ""):
            return []
        return [x.strip() for x in obj.interests.split(",") if x.strip()]


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = [
            "first_name", "last_name", "email", "phone",
            "region", "age", "gender", "interests", "password"
        ]

    def validate_email(self, value):
        value = value.strip().lower()
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def validate_password(self, value):
        validate_password(value)
        return value

    def create(self, validated_data):
        email = validated_data["email"].lower()
        base_username = email.split("@")[0]
        username = slugify(base_username)[:30] or "user"
        candidate = username
        i = 1
        while User.objects.filter(username=candidate).exists():
            i += 1
            candidate = f"{username}{i}"

        user = User(
            username=candidate,
            email=email,
            first_name=validated_data.get("first_name", ""),
            last_name=validated_data.get("last_name", ""),
            phone=validated_data.get("phone", ""),
            region=validated_data.get("region", ""),
            age=validated_data.get("age"),
            gender=validated_data.get("gender", ""),
            interests=validated_data.get("interests", ""),
        )
        user.set_password(validated_data["password"])
        user.save()
        return user


class EmailOrUsernameTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Allows login with either email+password or username+password.
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["email"] = serializers.EmailField(required=False)
        # Relax username required so email can be used instead
        self.fields[self.username_field].required = False

    def validate(self, attrs):
        email = attrs.get("email") or self.initial_data.get("email")
        if email and not attrs.get(self.username_field):
            try:
                user = User.objects.get(email__iexact=email.strip().lower())
                attrs[self.username_field] = getattr(user, self.username_field)
            except User.DoesNotExist:
                # Fall through; parent validate() will raise invalid credentials
                pass
        return super().validate(attrs)
