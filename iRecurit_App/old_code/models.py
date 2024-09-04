
#class CustomUser(Document):
#    id = UUIDField(primary_key=True, default=uuid.uuid4)
#    email = EmailField()
#    phone_number = IntField(default=0)
#    #user_type = StringField(default="candidate")
#    first_name = StringField()
#    last_name = StringField()
#    password = StringField()
#    is_profile_created = BooleanField(default=False)
#    is_email_verified = BooleanField(default=False)
#    confirmation_token = StringField(unique = True, blank=True)


#class OtpVerify(Document):
##    meta = {'collection': 'OtpVerify'}
#
#    user = ReferenceField(User)
#    phone_otp = IntField()


#class Resume(Document):
#    meta = {'collection': 'Resume'}

#    user = ReferenceField(User)
#    resume_file = StringField()


#class Education(Document):
#    meta = {'collection': 'Education'}#

#    user = ReferenceField(User)
#    degree = StringField()
#    institution = StringField()
#    graduation_from = IntField()
#    graduation_till = IntField()
#    cgpa = FloatField()


#class CandidateSkill(Document):
#    meta = {'collection': 'CandidateSkill'}#

#    user = ReferenceField(User)
#    skill = StringField()
 #   mastery_level = IntField(default=0, choices=[(i, i) for i in range(11)])  # Scale from 0 to 10


#WORK_MODE_CHOICES = (
 #   ('WFH', 'work from home'),
 #   ('ON_SITE', 'on site'),
 #   ('HYBRID', 'hybrid')
#)


#class WorkExperience(Document):
    # candidate's work exp
#    meta = {'collection': 'WorkExperience'}

#    user = ReferenceField(User)
#    role = StringField()
#    description = StringField()
#    company_name = StringField()
#    work_mode = StringField(choices=WORK_MODE_CHOICES)
#    current_ctc = IntField()


#class Reference(Document):
#    # candidate's references
#    meta = {'collection': 'Reference'}#

#    user = ReferenceField(User)
#    reference_name = StringField()
 #   reference_contact = StringField()


#class CandidateProfile(Document):
#    # Personal Info
#    meta = {'collection': 'CandidateProfile'}

#    user = ReferenceField(User)
#    profile_picture = ImageField()
#    email = EmailField()
#    phone_number = StringField()
#    country = StringField()
#    state = StringField()
#    city = StringField()
#    pincode = StringField()
#    languages_spoken = StringField()
#    awards = StringField()
#    hobbies = StringField()



# user = CustomUser(email="John@gmail.com", f_name="John", l_name="Wick")
# user.save()
# user = CustomUser.objects.filter(email="John@gmail.com").first()

# pipeline = [
#     {"$match": {"email": "John@gmail.com"}},
#     {"$limit": 1}
# ]
# result = CustomUser.objects.aggregate(*pipeline)
# print(result)
# users = list(result)
# print(users)
#
