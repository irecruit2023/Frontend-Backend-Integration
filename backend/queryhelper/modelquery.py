

class Modelquery:
    def __init__(self,conn) -> None:
        self.conn = conn
    
    
    
    
    async def get_stage_one_data(self, id):
        async with self.conn.acquire() as connection:
            async with connection.transaction():
                query = f'SELECT * FROM stage_one_data;'
                rows = await connection.fetch(query)
                data = [dict(row) for row in rows]
        return data

    
        
        