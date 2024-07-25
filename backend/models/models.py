from pydantic import BaseModel
from typing import List,Optional
from datetime import datetime
from typing import Dict

class SignupRequest(BaseModel):
   
    username: str
    password: str
    firstname: str
    lastname: str
    email: str

class LoginRequest(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class ConfirmationRequest(BaseModel):
    username: str
    confirmation_code: str

class ResendEmailRequest(BaseModel):
    username: str

class StageOneForm(BaseModel):
    nationality :str
    emailAddress : str
    phoneNumber : str
    addressLine1 : str
    country : str
    dateOfBirth : str
    zipcode : str
    preferredCountries : List[str]
    courseType : str
    areaOfInterests : List[str]
    courseStartDate : str
    budget : str
    gender : str
    addressLine2 : Optional[str]
    draft : int


class EducationForms(BaseModel):
    level : str
    selected : bool
    percentage : Optional[float]= None
    tentative_date: Optional[str]= None
    actual_date : Optional[str]= None
    college_name : Optional[str]= None
    board_name : Optional[str]= None
    attachement: Optional[str] = None


class User(BaseModel):
    userid : str
    username: str

class Userdetails(BaseModel):
    userid: Optional[int]
    username: Optional[str]
    firstname: Optional[str]
    lastname: Optional[str]
    user_email: Optional[str]


class ForgotPasswordRequest(BaseModel):
    username: str

class Confirm_Forgot_PasswordRequest(BaseModel):
    username: str
    confirmation_code:str
    password:str

class ChangePasswordRequest(BaseModel):
    
    previous_password: str
    new_password:str


class SignUpRequest(BaseModel):
    username: str
    password: str
    firstname: str
    lastname: str
    email: str

class ConfirmationRequest(BaseModel):
    username: str
    confirmation_code: str

class ResendEmailRequest(BaseModel):
    username: str

   