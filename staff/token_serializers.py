from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CareConnectTokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add role to the token payload
        token['role'] = user.role
        token['full_name'] = user.get_full_name()
        token['user_id'] = user.id
        return token