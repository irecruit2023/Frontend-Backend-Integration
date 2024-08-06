# connection.py

import mongoengine
import ssl
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("mongo_connection.log"),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

def setup_mongoengine_connection():
    try:
        mongoengine.connect(
            db="iRecruit",
            host='mongodb+srv://irecruituu:XDvYUCXQKNxBbTx8@irecruitcluster.6samspz.mongodb.net',
            ssl=True,
            ssl_cert_reqs=ssl.CERT_NONE
        )
        logger.info("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        logger.error(f"Error connecting to MongoDB: {e}")
