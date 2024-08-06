/**
 * All the methods are responsible for interacting with the backend Flask API server from the React frontend.
 * @namespace utils
 */

/**
 * Sign up a new candidate by sending their details to the backend.
 * @function
 * @param {string} candidate_email - The email of the candidate.
 * @param {string} candidate_first_name - The first name of the candidate.
 * @param {string} candidate_last_name - The last name of the candidate.
 * @param {string} password - The password for the candidate.
 * @returns {Promise<Object>} The response from the backend.
 */
export const signup = async (candidate_email, candidate_first_name, candidate_last_name, password) => {
  let response = null;
  await fetch("/api/signup/", {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ candidate_email, candidate_first_name, candidate_last_name, password })
  })
  .then((data) => data.json())
  .then((data) => {
      response = data;
  });
  return response;
};

/**
 * Log in a candidate using their email and password.
 * @function
 * @param {string} candidate_email - The email of the candidate.
 * @param {string} password - The password of the candidate.
 * @returns {Promise<Object>} The response from the backend.
 */
export const userLogin = async (candidate_email , password) => {
  let response = null;
  await fetch("/api/login/", {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ candidate_email, password })
  })
  .then((data) => data.json())
  .then((data) => {
      response = data;
  });
  return response;
};
/**
 * Upload a resume in PDF format to the backend.
 * @function
 * @param {File} pdf - The PDF file to be uploaded.
 * @returns {Promise<Object>} The response from the backend.
 */
export const uploadResume = async (pdf) => {
    var response = null;
    await fetch("/api/upload_resume/", {
      method: "POST",
      dataType: "json",
      body: JSON.stringify({ pdf }),
    })
      .then((data) => data.json())
      .then((data) => {  
        response = data;
      });
    return response;
};

/**
 * Refresh the authentication token.
 * @function
 * @returns {Promise<Object>} The response from the backend.
 */
export const refreshToken = async () => {
    var response = null;
    await fetch("/api/refresh_token/", {
      method: "POST",
      dataType: "json",
      body: JSON.stringify({}),
    })
      .then((data) => data.json())
      .then((data) => {  
        response = data;
      });
    return response;
};

/**
 * Get the resume of a user by their ID.
 * @function
 * @param {string} user_id - The ID of the user.
 * @returns {Promise<Object>} The response from the backend.
 */
export const getResume = async (user_id) => {
    var response = null;
    await fetch(`/api/get_resume/${user_id}/`, {
      method: "GET",
      dataType: "json",
    })
      .then((data) => data.json())
      .then((data) => {  
        response = data;
      });
    return response;
};
