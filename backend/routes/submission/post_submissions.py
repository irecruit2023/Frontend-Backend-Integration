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
import uuid
from queryhelper.modelquery import Modelquery
from ..auths import *


router = APIRouter(
    prefix="/submission",
    tags=['Submission']
)



from datetime import datetime

def convert_date_to_postgres_format(date_str):
    try:
        # Attempt to parse the string into a datetime object using two different formats
        date_obj = datetime.strptime(date_str, '%d/%m/%Y')
    except ValueError:
        try:
            # If the first format fails, try the alternative format
            date_obj = datetime.strptime(date_str, '%d/%m/%Y')
        except ValueError:
            # If both formats fail, return None
            return None

    # Format the datetime object into the desired format for PostgreSQL datetime
    postgres_date_str = date_obj.strftime('%Y-%m-%d')
    date_obj = datetime.strptime(postgres_date_str, '%Y-%m-%d')

# Extract the date component from the datetime object
    date_value = date_obj.date()
    return date_value

    
@router.post('/stage_01_api',status_code=status.HTTP_201_CREATED)
async def stage_01_development(request: StageOneForm,token: str = Depends(oauth2_scheme),pool: Pool = Depends(get_pool)):
    
    id= await get_user(token,pool)
        
    
    
    uid = str(uuid.uuid4())
    data = [int(id),uid]
    dateOfbirth = convert_date_to_postgres_format(request.dateOfBirth)
    courseStartDate = convert_date_to_postgres_format(request.courseStartDate)
    data.extend([request.nationality, request.emailAddress, request.phoneNumber, request.addressLine1,
                 request.country, dateOfbirth, request.zipcode,str(request.preferredCountries),
                 request.courseType, courseStartDate, request.budget,
                 request.gender, request.addressLine2, request.draft])

    data = tuple(data)
    print(len(data))
    print(data)
    async with pool.acquire() as connection:
        
        # Define the SQL query to retrieve user information based on the email
            # Execute the SQL query with the email as a parameter
           
            sql = """INSERT INTO stage_one_data (id , submission,nationality, emailaddress, phonenumber, addressline1,
                                    country, dateofbirth, zipcode, preferredcountries,
                                    coursetype, coursestartdate, budget,
                                    gender, addressline2, draft)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14,$15,$16)"""

            # Fetch the result
            result=await connection.execute(sql, *data)
            
            

            # Commit the transaction
            
            

            # Return the number of affected rows (optional)
            return {"message": "Success", "data": {"user_id": id, "uid": uid}}, status.HTTP_201_CREATED


@router.post('/education_details',status_code=status.HTTP_201_CREATED)
async def education_details(submission_id,request: List[EducationForms],token: str = Depends(oauth2_scheme),pool: Pool = Depends(get_pool)):
    submission_id = submission_id
    count = 0
    for x in request:
        
        if x.selected:
            data = [submission_id, x.level,x.selected,x.percentage,x.tentative_date,x.actual_date,x.college_name,x.board_name,x.attachement]
            data = tuple(data)
            async with pool.acquire() as connection:
                
                    
                    sql = 'insert into EducationForms values(%s,%s,%s,%s,%s,%s,%s,%s,%s);'
            # Fetch the result
                    await connection.execute(sql, data)
                    
                    count = count+1

                    # Commit the transaction

            # Return the number of affected rows (optional)
    return {"message": f"Data inserted.{count}"}
                
                
                    

@router.get('/stage_one_data',status_code=status.HTTP_201_CREATED)
async def get_stage_one_data(token: str = Depends(oauth2_scheme),pool: Pool = Depends(get_pool)):
    id= await get_user(token,pool)
   
    data = await Modelquery(pool).get_stage_one_data(id)
    
    
    return{"message":"Success","Data":data}
    