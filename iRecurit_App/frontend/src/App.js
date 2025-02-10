import { useEffect } from "react";
import { Routes, Route, useNavigationType, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Landing from "./genPages/landing";
import Login from "./genPages/login";
import SignUp from "./genPages/signUp";
import SignUpMessage from "./genPages/signUpMessage";
import EmailActivation from "./genPages/activation";
import EmailExpiredMessage from "./genPages/email-expired-message";
import ThankYouComponent from "./genPages/ThankYouComponent";

import Home from "./pages/home";
import Main from "./pages/main";
import Profile from "./pages/profile";
import JobsSearch from "./pages/jobs-search";
import JobDetails from "./pages/job-details";


import Jobs from "./orgPages/jobs";
import Account from "./orgPages/account";
import Organization from "./orgPages/organization";
import OrganizationSignup from "./orgPages/organization-signup";
import JobDescriptionTemplate from "./orgPages/jobs-template";
import ManageJobsTable from "./orgPages/manage-jobs-table";
import JobDetailsEdit from "./orgPages/job-details-edit";
import PublishJD from "./orgPages/publish-jd";



function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signUp" element={<SignUp/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/jobs" element={<Jobs/>} />
        <Route path="/jobs-search" element={<JobsSearch/>} />
        <Route path="/jobs-search/job-details" element={<JobDetails/>} />
        <Route path="manage-jobs/jobs-edit" element={<JobDetailsEdit/>} />
        <Route path="/publish-jobs" element={<PublishJD/>} />
        <Route path="/account" element={<Account/>} />
        <Route path="/organization" element={<Organization/>} />
        <Route path="/main" element={<Main/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/signUpMessage" element={<SignUpMessage/>} />
        <Route path="/activate" element={<EmailActivation/>} />
        <Route path="/expired" element={<EmailExpiredMessage/>} />
        <Route path="/organization-signup" element={<OrganizationSignup/>} />
        <Route path="/jobs-template" element={<JobDescriptionTemplate/>} />
        <Route path="/organization-thankyou" element={<ThankYouComponent/>} />
        <Route path="/manage-jobs" element={<ManageJobsTable/>} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
