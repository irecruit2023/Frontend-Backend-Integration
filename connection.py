# connection.py

import mongoengine
import ssl

def setup_mongoengine_connection():
    try:
        mongoengine.connect(
            db="iRecruit",
            host='mongodb+srv://irecruituu:XDvYUCXQKNxBbTx8@irecruitcluster.6samspz.mongodb.net',
            ssl=True,
            ssl_cert_reqs=ssl.CERT_NONE
        )
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(f"Error connecting to MongoDB: {e}")
