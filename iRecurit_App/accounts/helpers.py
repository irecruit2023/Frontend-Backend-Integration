from django.contrib.auth.base_user import AbstractBaseUser
from rest_framework_simplejwt.tokens import RefreshToken
import random
# from openai import OpenAI
# import json
# import time

from django.conf import settings
import requests
from django.core.mail import send_mail
import secrets
from django.contrib.auth.tokens import PasswordResetTokenGenerator
import six
# from google.auth.transport.requests import Request
# from google.oauth2 import service_account
# from langchain.prompts import PromptTemplate
# from langchain.chains import RetrievalQA
# from langchain.text_splitter import CharacterTextSplitter
import openai

# this function is used to generate the tokens for authorization

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
    
class TokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return (
            six.text_type(user.pk) + 
            six.text_type(timestamp) + 
            six.text_type(user.is_email_verified)
        )

generate_token = TokenGenerator()

    
    
    
# import openai
# def transform_to_json_schema(message_content):
#     # Sample response string from AI, should be passed in here as the content of the response
#     # e.g., "Programming Languages: Python, C++, JavaScript, Frameworks: Django, Flask, etc."
#     transformed_data = {
#         "frameworks": {},
#         "prog_lang": {},
#         "methodologies": {},
#         "functional_role": {},
#         "domains": {},
#         "soft_skills": {},
#         "domain_skills": {}
#     }

#     # Log the AI response content to see how it looks
#     print("Parsing AI response content:", message_content)

#     lines = message_content.splitlines()
#     current_category = None

#     # Mapping section headers to keys in the transformed data
#     category_mapping = {
#         "Programming Languages": "prog_lang",
#         "Frameworks": "frameworks",
#         "Databases": "domain_skills",
#         "Cloud Technologies": "domains",
#         "Experience": "functional_role",
#         "Certificates": None,  # Skipping these sections
#         "Achievements": None   # Skipping these sections
#     }

#     for line in lines:
#         line = line.strip()

#         # Check if the line starts a new category
#         if line.startswith("- "):
#             category_title = line[2:].split(":")[0]
#             current_category = category_mapping.get(category_title)
        
#         # If we're in a valid category, extract the skills/items
#         elif current_category and line.startswith("  - "):
#             skill_name = line[4:].strip()
#             transformed_data[current_category][skill_name] = "Intermediate"  # Default skill level

#     # Log the transformed data for debugging
#     print("Transformed skills data:", transformed_data)

#     return transformed_data



# # AI Engine response processing function
# def generate_response(document_text, query_text, api_key):
#     # Set your OpenAI API key
#     openai.api_key = api_key

#     try:
#         # Call OpenAI's chat completion method with the correct parameters
#         response = openai.chat.completions.create(
#             model="gpt-3.5-turbo",  # Use the correct chat model
#             messages=[
#                 {"role": "system", "content": "You are a helpful assistant."},
#                 {"role": "user", "content": f"{query_text}\nResume content:\n{document_text}"}
#             ],
#             max_tokens=500,
#             temperature=0.7  # Adjust as needed
#         )

#         # Extract the response content
#         message_content = response.choices[0].message.content
        
#         # Print the full response to debug
#         print(f"Full AI Engine Response: {response}")

#         # Transform AI response into the desired JSON schema
#         transformed_response = transform_to_json_schema(message_content)
        
#         # Print the transformed data to the terminal
#         print(f"Transformed Response: {transformed_response}")

#         return {"response": "Data processed successfully", "skills_data": transformed_response}

#     except Exception as e:
#         print(f"Error during OpenAI request: {str(e)}")
#         return {"error": "OPENAI_API_ERROR", "details": str(e)}

