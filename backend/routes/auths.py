from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from fastapi import APIRouter, Depends
from asyncpg.pool import Pool
import hashlib
import hmac
import base64
from models.models import * 
from models.db_utlis import *
import boto3
import json
from dotenv import dotenv_values
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
router = APIRouter(
    prefix="/auth",
    tags=['Auth']
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")
config = dotenv_values(".env")
global client_id
client_id = config["CLIENT_ID"]
global client_secret 
client_secret = config["CLIENT_SECRET"]

def calculate_secret_hash(client_secret, username, client_id):
    message = username + client_id
    dig = hmac.new(str(client_secret).encode('utf-8'),
                   msg=message.encode('utf-8'),
                   digestmod=hashlib.sha256).digest()
    return base64.b64encode(dig).decode()



@router.post("/signup", status_code=status.HTTP_201_CREATED)
async def signup(request: SignupRequest, pool: Pool = Depends(get_pool)):
    # Replace with your actual client secret

    client = boto3.client('cognito-idp', region_name='us-east-1')
    try : 
        response = client.sign_up(
            ClientId=client_id,
            SecretHash=calculate_secret_hash(client_secret, request.username, client_id),
            Username=request.username,
            Password=request.password,
            UserAttributes=[
                {
                    'Name': 'custom:firstname',
                    'Value': request.firstname
                },
                {
                    'Name': 'custom:lastname',
                    'Value': request.lastname
                },
                {
                    'Name': 'email',
                    'Value': request.email
                },
            ]
        )

        if response["ResponseMetadata"]["HTTPStatusCode"] == 200:
                async with pool.acquire() as connection:
                    async with connection.transaction():
                        await connection.execute(
                            'INSERT INTO users (username, firstname, lastname, email) VALUES ($1, $2, $3, $4)',
                            request.username, request.firstname, request.lastname, request.email
                        )
                    print("User signed up successfully")
                    return {"message": "User signed up successfully"}
        else:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User signup failed")

    except client.exceptions.UsernameExistsException:
        error_response = {"error": "Username already exists"}
        return Response(status_code=status.HTTP_409_CONFLICT, content=json.dumps(error_response))

    except client.exceptions.ClientError as e:
        error_code = e.response['Error']['Code']
        if error_code == 'InvalidPasswordException':
            error_response = {"error": "Invalid password"}
            return Response(status_code=status.HTTP_400_BAD_REQUEST, content=json.dumps(error_response))
        elif error_code == 'InvalidParameterException':
            error_response = {"error": "Invalid parameter"}
            return Response(status_code=status.HTTP_400_BAD_REQUEST, content=json.dumps(error_response))
        else:
            error_response = {"error": "An error occurred"}
            return Response(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content=json.dumps(error_response))

    except Exception as e:
        error_response = {"error": str(e)}
        return Response(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content=json.dumps(error_response))


@router.post("/confirm",tags=['Auth'])
def confirm_signup(request: ConfirmationRequest):
     # Replace with your actual client secret

    client = boto3.client('cognito-idp', region_name='us-east-1')
    try:
        response = client.confirm_sign_up(
            ClientId=client_id,
            SecretHash=calculate_secret_hash(client_secret, request.username, client_id),
            Username=request.username,
            ConfirmationCode=request.confirmation_code
        )
        return {"message": "Confirmation successful"}
    except client.exceptions.CodeMismatchException :
        error_response = {"error": "Code MisMatched"}
    
        return Response(status_code=status.HTTP_401_UNAUTHORIZED, content=json.dumps(error_response))
    except Exception as e :
        error_response = {"error": str(e)}
    
        return Response(status_code=status.HTTP_401_UNAUTHORIZED, content=json.dumps(error_response))

@router.post("/resend",tags=['Auth'])
def resend_confirmation_email(request: ResendEmailRequest):
      # Replace with your actual client secret

    client = boto3.client('cognito-idp', region_name='us-east-1')
    try:
        response = client.resend_confirmation_code(
            ClientId=client_id,
            SecretHash=calculate_secret_hash(client_secret, request.username, client_id),
            Username=request.username
        )
        return {"message": "Confirmation email resent"}
    except Exception as e:
        return {"error": str(e)}
    

client = boto3.client('cognito-idp', region_name='us-east-1')
def authenticate_user(username: str, password: str):
    try:
        response = client.initiate_auth(
            ClientId=client_id,
            AuthFlow='USER_PASSWORD_AUTH',
            AuthParameters={
                'USERNAME': username,
                'PASSWORD': password,
                'SECRET_HASH': calculate_secret_hash(client_secret, username, client_id)
            }
        )
        # print(response)
        access_token = response['AuthenticationResult']['AccessToken']
        
        return {"access_token": access_token, "token_type": "bearer"}
    except client.exceptions.NotAuthorizedException:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    except client.exceptions.UserNotFoundException:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.post("/login", response_model=Token,tags=['Auth'])
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    # try:
    print("here")
    return authenticate_user(form_data.username, form_data.password)
    
    # except client.exceptions.NotAuthorizedException:
    #         raise Exception("Invalid credentials sanskar")

@router.post("/change_password",tags=['Auth'])
def change_password(request: ChangePasswordRequest ,token : str= Depends(oauth2_scheme)):
    try:

        response = client.change_password(
            # ClientId=client_id,
            # SecretHash=calculate_secret_hash(client_secret, request.username, client_id),
            PreviousPassword=request.previous_password,
            ProposedPassword=request.new_password,
            AccessToken=token
        )
    except client.exceptions.InvalidPasswordException as e:
        return {"error": "Invalid password. Please provide a stronger password."}
    except client.exceptions.NotAuthorizedException as e:
        return {"error": "Incorrect username or password."}
    except client.exceptions.UserNotFoundException as e:
        return {"error": "User not found. Please provide a valid username."}
    except client.exceptions.LimitExceededException as e:
        return {"error": "Attempt limit exceeded. Please try again after some time."}
    

    return response


@router.post("/forgot_password",tags=['Auth'])
def forgot_password(request: ForgotPasswordRequest):
    response = client.forgot_password(
        ClientId=client_id,
        SecretHash=calculate_secret_hash(client_secret, request.username, client_id),
        Username=request.username
    )
    return response

@router.post("/confirm_forgot_password",tags=['Auth'])
def confirm_forgot_password(request: Confirm_Forgot_PasswordRequest):
    response = client.confirm_forgot_password(
        ClientId=client_id,
        SecretHash=calculate_secret_hash(client_secret, request.username, client_id),
        Username=request.username,
        ConfirmationCode=request.confirmation_code,
        Password=request.password
    )
    return response



###In Function method
async def get_user(token: str = Depends(oauth2_scheme), pool: Pool = Depends(get_pool)):
    response = client.get_user(AccessToken=token)
    username = response['Username']
    print(username)
    
    async with pool.acquire() as connection:
        async with connection.transaction():
            query = f"SELECT userid FROM users WHERE username='{username}'"
            result = await connection.fetch(query)
            if result:
                return result[0][0]
            return None  # Return None if user not found

    
@router.get("/get_userid", tags=['Auth'])
async def get_userid(token: str = Depends(oauth2_scheme), pool: Pool = Depends(get_pool)):
    response = client.get_user(
        AccessToken=token
    )
    username = response['Username']
    print(username)
    async with pool.acquire() as connection:
        async with connection.transaction():
            query = "SELECT * FROM users WHERE username=$1"
            result = await connection.fetch(query, username)
            
            userdetails = []
            for row in result:
                user = Userdetails(
                    userid=row[0],
                    username=row[1],
                    firstname=row[2],
                    lastname=row[3],
                    user_email=row[4]
                )
                userdetails.append(user)

            if not userdetails:
                raise HTTPException(status_code=404, detail="User not found")

    return userdetails