import unittest
import requests
import threading
import logging
import time
import os
from dotenv import load_dotenv


load_dotenv()
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

ADD_JOB_URL = os.getenv("ADD_JOB_URL", "ADD_JOB_URL")
UPDATE_JOB_URL = os.getenv("UPDATE_JOB_URL", "UPDATE_JOB_URL")
AUTH_URL = os.getenv("AUTH_URL", "AUTH_URL")

NUM_JOBS = 10

RESUME_PATH = "Dhruv_adavadkar_resume.pdf"

class TestJobApi(unittest.TestCase):
    
    @classmethod
    def setUpClass(cls):
        cls.job_ids = []
        cls.jwt_token = cls.obtain_jwt_token()

    @classmethod
    def obtain_jwt_token(cls):
        data = {
            'candidate_email':os.getenv("CANDIDATE_EMAIL", "candidate_email"),
            'password': os.getenv("PASSWORD", 'password')
        }
        try:
            response = requests.post(AUTH_URL, json=data)
            logging.info("Authentication response status code: %d", response.status_code)
            logging.info("Authentication response body: %s", response.text)
            if response.status_code == 200:
                token = response.json().get('access_token')
                logging.info("JWT token obtained successfully: %s", token)
                return token
            else:
                logging.error("Failed to obtain JWT token. Status code: %d, Response: %s", response.status_code, response.text)
                raise RuntimeError("Failed to obtain JWT token")
        except Exception as e:
            logging.error("Exception occurred while obtaining JWT token: %s", str(e))
            raise RuntimeError("Exception occurred while obtaining JWT token")

            

        
        
    def test_add_job(self):
        try:
            with open(RESUME_PATH, 'rb') as file:
                files = {'file': ('resume.pdf', file, 'application/pdf')}
                headers = {'Authorization': f'Bearer {self.__class__.jwt_token}'}
                logging.info("Headers for update job status request: %s", headers)
                response = requests.post(ADD_JOB_URL, headers=headers, files=files, data={'resume_id': 'sample_resume_id'})
                logging.info("Add job response status code: %d", response.status_code)
                if response.status_code == 201:
                    logging.info("Job added successfully")
                    job_id = response.json().get('id')
                    if job_id is not None:
                        logging.info("Job added successfully. Job ID: %s", job_id)
                        self.__class__.job_ids.append(job_id)
                    else:
                        logging.info("Job added successfully, but no job ID returned.")
                else:
                    logging.error("Failed to add the job: %s", response.text)
                    self.fail("Failed to add the job")
                    
        except Exception as e:
            logging.error("Exception occurred while adding job: %s", str(e))
            self.fail(f"Exception occurred while adding job: {str(e)}")
    
    ## remove the comment when to test this api
    #def test_update_job_status(self):
    #    for job_id in self.__class__.job_ids:
            #try:
                #data = {
                #    'job_id': job_id,
                #    'status': 'completed'
                #}
                #headers = {'Authorization': f'Bearer {self.__class__.jwt_token}'}
                #response = requests.post(UPDATE_JOB_URL, json=data, headers=headers)
                #if response.status_code == 200:
                #    logging.info("Job %s status updated to completed", job_id)
                #else:
                #    logging.error("Failed to update job %s status: %s", job_id, response.text)
                ##    self.fail(f"Failed to update job {job_id} status")
            #except Exception as e:
            #    logging.error("Exception occurred while updating job %s: %s", job_id, str(e))
            #    self.fail(f"Exception occurred while updating job {job_id}: {str(e)}")

    @classmethod
    def simulate_jobs(cls):
        for _ in range(NUM_JOBS):
            cls().test_add_job()
            time.sleep(0.1)  # Small delay to avoid overwhelming the server

       # def update_jobs():
            #cls().test_update_job_status()
            #time.sleep(0.1)  # Small delay to avoid overwhelming the server

        #threading.Thread(target=update_jobs).start()

if __name__ == "__main__":
    #unittest.main()
    TestJobApi.setUpClass()
    TestJobApi.simulate_jobs()
