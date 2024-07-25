import asyncio
import aiomysql

class DatabasePool:
    def __init__(self):
        self.db_params = {
            'DB_HOST': '127.0.0.1',
            'DB_PORT': 3306,
            'DB_NAME': 'uniasend',
            'DB_USER': 'root',
            'DB_PASSWORD': '4844',
        }

        try:
            self.connection_pool = None  # Initialize connection pool
            asyncio.run(self.db_connect())
            print(self.connection_pool)

        except Exception as e:
            print(e)

    async def db_connect(self):
        try:
            self.connection_pool = await aiomysql.create_pool(
                host=self.db_params['DB_HOST'],
                port=self.db_params['DB_PORT'],
                user=self.db_params['DB_USER'],
                password=self.db_params['DB_PASSWORD'],
                db=self.db_params['DB_NAME'],
                minsize=1,
                maxsize=5,
            )

        except Exception as e:
            print(e)

    async def get_connection(self):
        return await self.connection_pool.acquire()

    async def release_connection(self, connection):
        await self.connection_pool.release(connection)


db=DatabasePool()

