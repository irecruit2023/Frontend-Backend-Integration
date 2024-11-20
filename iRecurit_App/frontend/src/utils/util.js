/**
 * All the methods are responsible for interacting with the backend Flask API server from the React frontend.
 * @namespace utils
 */

import { notifyError } from "../helper";

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
export const uploadResume = async (file) => {
  let response = null;
  const formData = new FormData();
  formData.append('file', file); // Append the file to formData

  try {
    const loginInfo = localStorage.getItem('loginInformation');
    if (!loginInfo) {
      throw new Error("Login information not found in localStorage");
    }

    const token = JSON.parse(loginInfo).data.access_token;

    const res = await fetch('/api/upload_resume/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`, // Add token for auth
      },
      body: formData,
    });

    response = await res.json(); // Parse the JSON response
    return response;

  } catch (error) {
    console.error('Upload resume error:', error);
    throw new Error(error.message || 'Failed to upload resume');
  }
};



export const generateProfile = async (user_id) => {
  const token = JSON.parse(localStorage.getItem('loginInformation')).data.access_token;

  try {
    const response = await fetch(`/api/generate_profile/${user_id}/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`, // Include the JWT token in the Authorization header
        'Content-Type': 'application/json',
      },
    });

    // Check if the response is successful (status 200-299)
    if (!response.ok) {
      // Attempt to parse the error message
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error generating profile');
    }

    // Parse the successful response
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error generating profile:', error.message);
    throw new Error(error.message || 'Failed to generate profile');
  }
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


// export const getResume = async(userId)=> {
//   try {
//       const response = await fetch(`/api/get_resume/${userId}`, {
//           method: 'GET',
//           headers: {
//               'Authorization': `Bearer ${JSON.parse(localStorage.loginInformation).data.access_token}`, // Assuming JWT token is stored in localStorage
//               'Content-Type': 'application/pdf'
//           }
//       });
//       console.log("response",response)

//       if (response.ok) {
//           // Check for PDF content type
//           const contentType = response.headers.get('Content-Type');
//           console.log("type",contentType)
//           if (contentType === 'application/pdf') {
//               const blob = await response.blob();
//               const url = window.URL.createObjectURL(blob);
//               const newTab = window.open(url, '_blank');
//               if (newTab) {
//                   newTab.focus();
//               } else {
//                   console.error('Failed to open new tab.');
//               }
//           } else {
//               const data = await response.json();
//               console.error('Failed to fetch resume:', data.message);
//           }
//       } else if (response.status === 404) {
//           console.error('Resume not found');
//       } else {
//           const errorData = await response.json();
//           console.error('Error fetching resume:', errorData.message);
//       }
//   } catch (error) {
//       console.error('Error:', error);
//   }
// }



export const getResume = async(userId)=> {
  try {
      // Make a request to the Django backend to get the PDF
      const response = await fetch(`/api/get_resume/${userId}/`);
      
      // Check if the request was successful
      if (!response.ok) {
          throw new Error('Resume not found or there was an error fetching the file.');
      }
      
      // Get the PDF blob from the response
      const blob = await response.blob();
      
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a link element
      const a = document.createElement('a');
      a.href = url;
      a.download = 'resume.pdf'; // Set the filename for download
      document.body.appendChild(a);
      
      // Programmatically click the link to trigger the download
      a.click();
      
      // Remove the link element
      document.body.removeChild(a);
      
      // Revoke the object URL
      window.URL.revokeObjectURL(url);
  } catch (error) {
      console.error('Error downloading resume:', error);
  }
}


export const skillAnalysisData = async () => {
  try {
    const loginInfo = localStorage.getItem('loginInformation');
    if (!loginInfo) {
      console.error("No login information found in localStorage.");
      return null;
    }

    const token = JSON.parse(loginInfo).data.access_token;
    console.log("Token:", token);  // Log the token to verify it's correct

    const response = await fetch("/api/chart-data/", {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch chart data: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("API Response Data:", data);  // Log the data to check the API response
    return data;

  } catch (error) {
    console.error("Error fetching chart data:", error);
    return null; // Handle the error
  }
};



export const checkEmailConfirmation = async (email) => {
  try {
    // Make the API request for email confirmation
    const response = await fetch(`/api/Check_Confirmation/?email=${email}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Check if the response is OK (status 200-299)
    if (!response.ok) {
      const errorData = await response.json(); // Extract the error details
      throw new Error(`Failed to fetch email confirmation: ${errorData.message}`);
    }

    // Parse and return the response data
    const data = await response.json();
    console.log("Email Confirmation Data:", data);  // Log the data for verification
    return data;

  } catch (error) {
    console.error("Error fetching email confirmation:", error);
    return null;  // Return null in case of an error
  }
};




export const resendVerificationEmail= async (email) => {
  try {
    // Make the API request for email confirmation
    const response = await fetch(`/api/resend_verification_email/?email=${email}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Check if the response is OK (status 200-299)
    if (!response.ok) {
      const errorData = await response.json(); // Extract the error details
      throw new Error(`Failed to fetch email confirmation: ${errorData.message}`);
    }

    // Parse and return the response data
    const data = await response.json();
    console.log("Email Confirmation Data:", data);  // Log the data for verification
    return data;

  } catch (error) {
    console.error("Error fetching email confirmation:", error);
    return null;  // Return null in case of an error
  }
};



export const getTopSkills= async (user_id) => {
  console.log(user_id)
  try {
    // Make the API request for email confirmation
    const response = await fetch(`/api/top_skills/${user_id}/`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json(); // Extract the error details
      throw new Error(`Failed to fetch  top 5 skills: ${errorData.message}`);
    }

    // Parse and return the response data
    const data = await response.json();
    console.log("api skills Data:", data);  // Log the data for verification
    return data;

  } catch (error) {
    console.error("Error fetching skills data:", error);
    return null;  // Return null in case of an error
  }
};



export const getUserDomain= async (user_id) => {
  console.log(user_id)
  try {
    // Make the API request for email confirmation
    const response = await fetch(`/api/domain/${user_id}/`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json(); // Extract the error details
      throw new Error(`Failed to fetch  top 5 skills: ${errorData.message}`);
    }

    // Parse and return the response data
    const data = await response.json();
    console.log("domain  Data:", data);  // Log the data for verification
    return data;

  } catch (error) {
    console.error("Error fetching domain data:", error);
    return null;  // Return null in case of an error
  }
};




export const getUserSummary= async (user_id) => {
  console.log(user_id)
  try {
    // Make the API request for email confirmation
    const response = await fetch(`/api/summary/${user_id}/`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json(); // Extract the error details
      throw new Error(`Failed to fetch  summary : ${errorData.message}`);
    }

    // Parse and return the response data
    const data = await response.json();
    console.log("summary  Data:", data);  // Log the data for verification
    return data;

  } catch (error) {
    console.error("Error fetching summary data:", error);
    return null;  // Return null in case of an error
  }
};




export const getUserEducation= async (user_id) => {
  console.log(user_id)
  try {
    // Make the API request for email confirmation
    const response = await fetch(`/api/education/${user_id}/`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json(); // Extract the error details
      throw new Error(`Failed to fetch  education : ${errorData.message}`);
    }

    // Parse and return the response data
    const data = await response.json();
    console.log("education  Data:", data);  // Log the data for verification
    return data;

  } catch (error) {
    console.error("Error fetching education data:", error);
    return null;  // Return null in case of an error
  }
};

export const getUserJobExperience= async (user_id) => {
  console.log(user_id)
  try {
    // Make the API request for email confirmation
    const response = await fetch(`/api/job_experience/${user_id}/`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json(); // Extract the error details
      throw new Error(`Failed to fetch  job_experience : ${errorData.message}`);
    }

    // Parse and return the response data
    const data = await response.json();
    console.log("job_experience  Data:", data);  // Log the data for verification
    return data;

  } catch (error) {
    console.error("Error fetching job_experience data:", error);
    return null;  // Return null in case of an error
  }
};



export const getUserCertificates= async (user_id) => {
  console.log(user_id)
  try {
    // Make the API request for email confirmation
    const response = await fetch(`/api/certificates/${user_id}/`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json(); // Extract the error details
      throw new Error(`Failed to fetch  certificates : ${errorData.message}`);
    }

    // Parse and return the response data
    const data = await response.json();
    console.log("certificates  Data:", data);  // Log the data for verification
    return data;

  } catch (error) {
    console.error("Error fetching certificates data:", error);
    return null;  // Return null in case of an error
  }
};



export const getUserAchievements= async (user_id) => {
  console.log(user_id)
  try {
    // Make the API request for email confirmation
    const response = await fetch(`/api/achievements/${user_id}/`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json(); // Extract the error details
      throw new Error(`Failed to fetch  job_experience : ${errorData.message}`);
    }

    // Parse and return the response data
    const data = await response.json();
    console.log("job_experience  Data:", data);  // Log the data for verification
    return data;

  } catch (error) {
    console.error("Error fetching job_experience data:", error);
    return null;  // Return null in case of an error
  }
};




// upload_case_study
export const uploadCaseStudy = async (file,user_id) => {
  let response = null;
  const formData = new FormData();
  formData.append('file', file); // Append the file to formData

  try {

    const res = await fetch(`/api/upload_case_study/${user_id}/`, {
      method: 'POST',
      body: formData,
    });

    console.log("res",res)

    response = await res.json(); // Parse the JSON response
    console.log(response)
    return response;

  } catch (error) {
    console.error('Upload resume error:', error);
    throw new Error(error.message || 'Failed to upload resume');
  }
};





