import asyncpg
from asyncpg.pool import Pool
from fastapi import Depends

from dotenv import dotenv_values

config = dotenv_values(".env")

async def get_pool() -> Pool:
    return await asyncpg.create_pool(
        user=config["DB_USER"],
        password=config["DB_PASSWORD"],
        database=config["DB_NAME"],
        host=config["DB_HOST"],
        port=config["DB_PORT"],
        min_size=int(config["DB_POOL_MIN_SIZE"]),
        max_size=int(config["DB_POOL_MAX_SIZE"])
    )

class Users:
    def __init__(self, pool: Pool):
        self.pool = pool
        # Call the asynchronous method to create the users table
        self.initialize()

    async def initialize(self):
        await self.create_users_table(self.pool)

    
    async def create_users_table(self,pool: Pool):
        async with pool.acquire() as connection:
            async with connection.transaction():
                await connection.execute('''
                    CREATE TABLE IF NOT EXISTS users (
                        userid SERIAL PRIMARY KEY,
                        username VARCHAR(255),
                        firstname VARCHAR(255),
                        lastname VARCHAR(255),
                        email VARCHAR(255)
                    )
                ''')


class CreateSubmissionsTable:
    def __init__(self, pool: Pool):
        self.pool = pool
            # Call the asynchronous method to create the users table

    async def create_interest_table(self):
        async with self.pool.acquire() as connection:
            async with connection.transaction():
                print(1)
                await connection.execute('''
                    CREATE TABLE IF NOT EXISTS interests (
                        id SERIAL PRIMARY KEY,
                        name VARCHAR(255) UNIQUE
                    )
                ''')

                # Insert predefined interests into the table
                interests = [
                    "Business",
                    "Computing",
                    "Engineering",
                    "Healthcare",
                    "Hospitality",
                    "Humanities",
                    "Law",
                    "Science",
                    "Social Sciences"
                ]

                # Insert interests into the table if they don't already exist
                # for interest in interests:
                #     await connection.execute(
                #         '''
                #         INSERT INTO interests (name)
                #         VALUES ($1)
                #         ON CONFLICT DO NOTHING
                #         ''',
                #         interest
                #     )


                await connection.execute(
                    '''
                    CREATE TABLE IF NOT EXISTS stage_one_data (
                    id INT,
                    submission VARCHAR(255),
                    nationality VARCHAR(255),
                    emailAddress VARCHAR(255),
                    phoneNumber VARCHAR(20),
                    addressLine1 VARCHAR(255),
                    country VARCHAR(255),
                    dateOfBirth date,
                    zipcode VARCHAR(20),
                    preferredCountries TEXT,
                    courseType VARCHAR(255),
                    courseStartDate date,
                    budget VARCHAR(20),
                    gender VARCHAR(10),
                    addressLine2 VARCHAR(255),
                    draft INT
                                        );
'''
                )
                await connection.execute(

                """CREATE TABLE IF NOT EXISTS EducationForms (
                        submission_id VARCHAR(255),
                        level VARCHAR(255) NOT NULL,
                        selected BOOLEAN NOT NULL,
                        percentage FLOAT,
                        tentative_date date,
                        actual_date date,
                        college_name VARCHAR(255),
                        board_name VARCHAR(255),
                        attachement VARCHAR(255)
                    );"""
                )
                await connection.execute(
               """CREATE TABLE IF NOT EXISTS area_of_interest (
                        submission_id VARCHAR(255),
                        interest_id INT,
                        FOREIGN KEY (interest_id) REFERENCES interests(id)
                    );"""
                )