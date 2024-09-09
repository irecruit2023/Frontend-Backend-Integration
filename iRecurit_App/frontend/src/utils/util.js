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
export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append('file', file); // Changed from 'resume' to 'file'

  try {
    const response = await fetch('/api/upload_resume/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.loginInformation).data.access_token}` // Assuming JWT token is stored in local storage
        // Note: You don't need 'Content-Type' here because fetch will automatically set it to 'multipart/form-data' when using FormData
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to upload resume');
    }

    const data = await response.json();
    return data; // Return the response data
  } catch (error) {
    console.error('Error uploading resume:', error.message);
    throw new Error(error.message || 'Failed to upload resume');
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




