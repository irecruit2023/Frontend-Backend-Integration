#class UserSignupSerializer(serializers.Serializer):

#    email = serializers.EmailField()
#    phone_number = serializers.IntegerField(default=0)
#    #user_type = serializers.CharField(default='candidate')
#    first_name = serializers.CharField(max_length=100)
#    last_name = serializers.CharField(max_length=100)
#    password = serializers.CharField(max_length=128)
    #password_confirm = serializers.CharField(max_length=128)
#    is_profile_created = serializers.BooleanField(default=False)

#    def validate(self, attrs):
#        email = attrs.get('email')
#        password = attrs.get('password')
#        
#        # Check if any CustomUser document exists with the given email
#        if CustomUser.objects.filter(email=email).count() > 0:
#            raise serializers.ValidationError("email_already_taken")
#        return attrs
#        

#    def create(self, validated_data): 
   #     user = CustomUser.objects.create(**validated_data)
#        user.is_active = False
#        #send_confirmation_email(user)
#        user.save()
        #confirmation_url = generate_confirmation_token()
        
        
#        return user
    



#class LoginSerializer(serializers.Serializer):
#    email = serializers.EmailField()
#    password = serializers.CharField(max_length=128, write_only=True)  # Mark password as write-only 



    



class CandidateProfileSerializer(serializers.Serializer):
    profile_picture = serializers.ImageField()
    email = serializers.EmailField()
    phone_number = serializers.CharField()
    country = serializers.CharField()
    state = serializers.CharField()
    city = serializers.CharField()
    pincode = serializers.CharField()
    languages_spoken = serializers.CharField()
    awards = serializers.CharField()
    hobbies = serializers.CharField()


class EducationSerializer(serializers.Serializer):
    degree = serializers.CharField()
    institution = serializers.CharField()
    graduation_from = serializers.IntegerField()
    graduation_till = serializers.IntegerField()
    cgpa = serializers.FloatField()


class CandidateSkillSerializer(serializers.Serializer):
    skill = serializers.CharField()
    mastery_level = serializers.IntegerField()


class WorkExperienceSerializer(serializers.Serializer):
    role = serializers.CharField()
    description = serializers.CharField()
    company_name = serializers.CharField()
    work_mode = serializers.CharField()
    current_ctc = serializers.IntegerField()


class ReferenceSerializer(serializers.Serializer):