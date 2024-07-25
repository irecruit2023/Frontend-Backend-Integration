from fastapi import FastAPI, UploadFile, File ,Request, HTTPException, Depends,status
from fastapi.responses import JSONResponse
from tempfile import NamedTemporaryFile
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from  models import * 
import uuid 
import math
from typing import List
from models.db import * 
from common_resources.helper import *
import uuid
from fastapi import FastAPI, File, UploadFile , HTTPException , Response,status, Depends
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import boto3
from botocore.exceptions import NoCredentialsError
from botocore.exceptions import ClientError
import hashlib
import hmac
import base64
import hmac
import datetime
from decimal import Decimal
from collections import defaultdict
import uuid
import json
from models import *
from typing import List
from io import BytesIO
from routes import auths
from routes.submission import post_submissions,attachment
from fastapi import FastAPI, Depends
from models.db import get_pool , Users
from models.models import *


app = FastAPI(title="Uniascend Server",
    description="A Prodoci Product",
    version="2.5.0.1",
    )

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)


app.include_router(auths.router)
app.include_router(post_submissions.router)
app.include_router(attachment.router)

@app.on_event("startup")
async def startup():
    app.state.pool = await get_pool()
    # user = Users(app.state.pool)
    # await CreateSubmissionsTable(app.state.pool).create_interest_table()
    # await user.create_users_table(app.state.pool)

@app.on_event("shutdown")
async def shutdown():
    await app.state.pool.close()

@app.get("/")
async def index(request: Request):
    from dotenv import dotenv_values
  
    config = dotenv_values(".env")
    global client_id
    client_id = config["CLIENT_ID"]
    global client_secret 
    client_secret = config["CLIENT_SECRET"]

    print(client_secret)
    print(type(client_secret))
    return {"message": "Hello"}