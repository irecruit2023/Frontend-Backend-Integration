# import mongoengine
# import ssl
# import logging
# from google.cloud import logging as cloud_logging

# # Initialize Google Cloud logging client
# client = cloud_logging.Client()
# client.setup_logging()

# # Configure logging
# logging.basicConfig(
#     level=logging.INFO,
#     format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
#     handlers=[
#         logging.StreamHandler()
#     ]
# )

# logger = logging.getLogger(__name__)

# def setup_mongoengine_connection():
#     try:
#         mongoengine.connect(
#             db="iRecruit",
#             host='mongodb+srv://irecruituu:XDvYUCXQKNxBbTx8@irecruitcluster.6samspz.mongodb.net',
#             ssl=True,
#             ssl_cert_reqs=ssl.CERT_NONE
#         )
#         logger.info("Pinged your deployment. You successfully connected to MongoDB!")
#     except Exception as e:
#         logger.error(f"Error connecting to MongoDB: {e}")

# # Call setup function to ensure connection at startup
# setup_mongoengine_connection()

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