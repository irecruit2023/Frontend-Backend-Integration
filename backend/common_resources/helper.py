async def user_id(auth,token,conn):
    info = auth.get_account_info(token)
    email = info['users'][0]['email']

    # Use the email to fetch user information from the User table
    
    async with conn.cursor() as cursor:
        # Define the SQL query to retrieve user information based on the email
        sql = "SELECT * FROM User WHERE EmailId = %s"
        
        # Execute the SQL query with the email as a parameter
        await cursor.execute(sql, (email,))
        
        # Fetch the result
        user_info = await cursor.fetchone()
        await conn.commit()
        return user_info


