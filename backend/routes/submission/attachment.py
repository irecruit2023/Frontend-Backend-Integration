from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from fastapi import  File, UploadFile 
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
import uuid
from ..auths import *


router = APIRouter(
    prefix="/submission/attachment",
    tags=['attachments']
)
config = dotenv_values(".env")
bucket_name = config['BUCKET_NAME']
submissions_folder =config['SUBMISSIONS'] 
s3 = boto3.client('s3')

@router.post('/upload_attachment',status_code=status.HTTP_201_CREATED)
async def upload_attachment(submission_id:str,additional_file: UploadFile,token: str = Depends(oauth2_scheme),pool: Pool = Depends(get_pool)):
    
    id= await get_user(token,pool)
    additional_file_path = f'{submissions_folder}/{id}/{submission_id}/{additional_file.filename}'
    s3.upload_fileobj(additional_file.file, bucket_name, additional_file_path)
    artwork_s3_url = f"https://{bucket_name}.s3.amazonaws.com/{additional_file_path}"

    return{"artwork_s3_url":artwork_s3_url,'submission_id':submission_id}