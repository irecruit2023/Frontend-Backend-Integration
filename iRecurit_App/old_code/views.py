#class UploadResumeView(APIView):
#    def post(self, request):
##        if str(request.user) == "AnonymousUser":
 #           return Response({"msg": "Unauthorized Access"}, status=status.HTTP_401_UNAUTHORIZED)
#        data = request.data
#        resume = data["resume_file"]
##        if resume:
 #           file_path = os.path.join(settings.MEDIA_ROOT, 'resumes', f"{str(request.user.email)}'s Resume")
  #          try:
   #             with open(file_path, 'wb') as f:
    #                for chunk in resume.chunks():
     #                   f.write(chunk)

#            except Exception as e:
#                return Response({"error": e, "msg": "Error saving resume file"},
#                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#            user = User.objects.get(id=request.user.id)
#            if user.is_profile_created == True:
#                resume_instance = Resume.objects.create(user=request.user.id, resume_file=file_path)
#                return Response({"msg": "Resume Uploaded Successfully",
#                                 "note": "Profile already exists", "is_profile_created": user.is_profile_created}, status=status.HTTP_204_NO_CONTENT)

#            extract_text_from_pdf.delay(request.user.id, file_path)
#            resume_instance = Resume.objects.create(user=request.user.id, resume_file=file_path)

#            return Response({"msg": "Resume Uploaded Successfully",
#                             "note": "Profile will create shortly!",
#                             "is_profile_created": user.is_profile_created}, status=status.HTTP_200_OK)

#        return Response({"error": "No resume file provided"}, status=status.HTTP_400_BAD_REQUEST)


#class MyProfileView(APIView):
#    def get(self, request):
#        if str(request.user) == "AnonymousUser":
#            return Response({"msg": "Unauthorized Access"}, status=status.HTTP_401_UNAUTHORIZED)
#        user_id = request.user.id
#        profile = User.objects.get(id=user_id)
#        if profile.is_profile_created == False:
#            return Response({"msg": "Profile not yet created!"}, status=status.HTTP_404_NOT_FOUND)

        #candidate_profile = CandidateProfile.objects.get(user=user_id)
       # candidate_education = Education.objects.filter(user=user_id)
       # candidate_skills = CandidateSkill.objects.filter(user=user_id)
       # candidate_work_exp = WorkExperience.objects.filter(user=user_id)
       # candidate_reference = Reference.objects.filter(user=user_id)
       # profile_serializer = CandidateProfileSerializer(candidate_profile)
       # education_serializer = EducationSerializer(candidate_education, many=True)
       # skills_serializer = CandidateSkillSerializer(candidate_skills, many=True)
       # work_exp_serializer = WorkExperienceSerializer(candidate_work_exp, many=True)
       # reference_serializer = ReferenceSerializer(candidate_reference, many=True)
       # return Response({"Personal_details": profile_serializer.data,
       #                  "education": education_serializer.data,
          #               "skills": skills_serializer.data,
        #                 "work_experience": work_exp_serializer.data,
         #                "references": reference_serializer.data}, status=status.HTTP_200_OK)


@api_view(['POST'])
@csrf_exempt
def test(request):
    """
    this view just returns dummy json, i.e for testing purposes
    """
    data = request.data
    profile_data = {
        "personal_profile": {
            "user": data['user_id'],
            'email': "test18@gmail.com",
            "phone_number": '1234567890',
            'country': 'India',
            'state': 'Madhya Pradesh',
            "city": 'Indore',
            "pincode": '452014',
            "languages_spoken": 'English, Hindi, Gujarati',
            "hobbies": 'Football'
        },
        "Education": {
            "user": data['user_id'],
            "degree": 'B.Sc',
            "institution": 'Medicaps Indore',
            "graduation_from": 2021,
            "graduation_till": 2024,
            "cgpa": 9.5
        },
        "Education2": {
            "user": data['user_id'],
            "degree": 'High School',
            "institution": 'Medicaps School Indore',
            "graduation_from": 2019,
            "graduation_till": 2021,
            "cgpa": 10
        },
        "skill1": {
            "user": data['user_id'],
            "skill": "Team work",
            "mastery_level": 10
        },
        "skill2": {
            "user": data['user_id'],
            "skill": "Node Js",
            "mastery_level": 8
        },
        "skill3": {
            "user": data['user_id'],
            "skill": "React Js",
            "mastery_level": 6
        },
        "reference1": {
            "user": data['user_id'],
            "reference_name": "Karan Ahuja",
            "reference_contact": '9876543210'
        },
    }
    return Response(profile_data)


#class CreateView(APIView):
    """
    this view is for testing purposes
    """

    def post(self, request):
        if str(request.user) == "AnonymousUser":
            return Response({"msg": "Unauthorized Access"}, status=status.HTTP_401_UNAUTHORIZED)
        candidate_profile = CandidateProfile.objects.create(
            user=request.user.id,
            email=request.user.email,
            phone_number='1234567890',
            country='India',
            state='Madhya Pradesh',
            city='Indore',
            pincode='452014',
            languages_spoken='English, Hindi, Gujarati',
            hobbies='Football'
        )
        #user = Education.objects.create(
        #    user=request.user.id,
        #    degree='B.Sc',
        #    institution='Medicaps Indore',
        #    graduation_from=2021,
        #    graduation_till=2024,
        #    cgpa=9.5
        #)
        #skill1 = CandidateSkill.objects.create(
        #    user=request.user.id,
 #           skill="React Js",
         #   mastery_level=5
  #      )
        skill2 = CandidateSkill.objects.create(
            user=request.user.id,
            skill="Node Js",
            mastery_level=9
        )
        skill3 = CandidateSkill.objects.create(
            user=request.user.id,
            skill="Team work",
            mastery_level=10
        )
        # user = WorkExperience.objects.create(
        #     user=request.user.id,
        #     role='Django Developer',
        #     description="Developed many applications",
        #     company_name='Signimus Technologies',
        #     work_mode='WFH',
        #     current_ctc='350000'
        #
        # )
        user = Reference.objects.create(
            user=request.user.id,
            reference_name="Karan Ahuja",
            reference_contact='9876543210'

        )
        return Response({"msg": "Profile created successfully", "user": candidate_profile.user.email},
                        status=status.HTTP_201_CREATED)
