import TopNavBar from "../components/top-nav-bar";
import styles from "./account.module.css";
import { Modal } from '../components/upload-resume';
import WelcomeHeader from "../components/welcome-header";
import { React, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ReactComponent as Ellipse1 } from "../assets/icons/ellipse-6.svg";
import { ReactComponent as Ellipse2 } from "../assets/icons/ellipse-5.svg";
import { ReactComponent as RightHomeIcon } from "../assets/icons/right.svg";
import InputField from "../components/input-field";




const Account = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => { console.log("called"), setModalOpen(true) };
  const closeModal = () => setModalOpen(false);
  const navigateMain = () => { navigate("/main") }

    ;

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setLogo(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const [logo, setLogo] = useState(null);
  const [formData, setFormData] = useState({
    companyName: '',
    employee: '',
    personName: '',
    email: '',
    phone: '',
    department: '',
  });

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };



  return (
    <div className={styles.root}>
      <TopNavBar userType="account" />
      <main className={styles.contentContainerWrapper}>
        <section className={styles.contentContainer}>
          <WelcomeHeader userType="account" />
          <div className={styles.benefitsContainerWrapper}>
            <div className={styles.benefitsContainer}>
              {/* <div className={styles.unleashTheFullPotentialOfParent}>
                <h1 className={styles.unleashTheFull}>
                  Change Password
                </h1>
                <div style={{


                  width: '100%',
                  maxWidth: '448px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px', // Space between fields and buttons
                }} >
                  <InputField
                    style={{ marginTop: '8px' }}
                    firstName="Password"
                    name="password"
                    // value={loginState.password}
                    vectorIcon={true}
                    // onChange={(e) => handleChange(e, "password")}
                    placeholder="password"
                  />
                  <InputField
                    firstName="Confirm Password"
                    name="password"
                    // value={loginState.password}
                    vectorIcon={true}
                    // onChange={(e) => handleChange(e, "password")}
                    placeholder="password"
                  />
                </ div>

                <div className={styles.primaryButtonParent}>
                  <div className={styles.primaryButton}>
                    <div className={styles.primary} style={{ cursor: "pointer" }} onClick={openModal} >Cancel</div>
                  </div>
                  <div className={styles.secondaryButton} >
                    <div className={styles.secondary} style={{ cursor: "pointer" }} onClick={navigateMain} >Submit</div>
                  </div>
                </div>

              </div> */}
              <div className={styles.container}>
                <h2 className={`mb-4 ${styles.title}`}><b >Company Details</b></h2>

                {/* Drag and Drop Area for Company Logo */}
                <label htmlFor="companyLogo" className={`form-label ${styles.label}`}>Company Logo Image</label>
                <div
                  className={styles.dragDropArea}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  {logo ? (
                    <img src={logo} alt="Company Logo" className={styles.companyLogo} />
                  ) : (
                    <div className={`text-center ${styles.dragDropText}`}>
                      <b> drop your file here ,</b> or <b> browse from device</b>
                    </div>
                  )}
                </div>

                <form>
                  {/* Row 1: Company Name & Number of Employees */}
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="companyName" className={`form-label ${styles.label}`}>
                        Company Name
                      </label>
                      <input
                        type="text"
                        className={`form-control ${styles.input}`}
                        id="companyName"
                        placeholder="Enter company name"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="noOfEmployees" className={`form-label ${styles.label}`}>
                        Number of Employees
                      </label>
                      <input
                        type="number"
                        className={`form-control ${styles.input}`}
                        id="noOfEmployees"
                        placeholder="Enter total employees"
                      />
                    </div>
                  </div>

                  {/* Row 2: Person's Name & Email */}
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="personName" className={`form-label ${styles.label}`}>
                        Person's Name
                      </label>
                      <input
                        type="text"
                        className={`form-control ${styles.input}`}
                        id="personName"
                        placeholder="Enter full name"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email" className={`form-label ${styles.label}`}>
                        Email
                      </label>
                      <input
                        type="email"
                        className={`form-control ${styles.input}`}
                        id="email"
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>


                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="phone" className={`form-label ${styles.label}`}>
                        Phone
                      </label>
                      <input
                        type="tel"
                        className={`form-control ${styles.input}`}
                        id="phone"
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="position" className={`form-label ${styles.label}`}>
                        Position/Department
                      </label>
                      <input
                        type="text"
                        className={`form-control ${styles.input}`}
                        id="position"
                        placeholder="Enter job position"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="address" className={`form-label ${styles.label}`}>
                        Address
                      </label>
                      <input
                        type="text"
                        className={`form-control ${styles.input}`}
                        id="address"
                        placeholder="Enter company address"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="department" className={`form-label ${styles.label}`}>
                        Department
                      </label>
                      <input
                        type="text"
                        className={`form-control ${styles.input}`}
                        id="department"
                        placeholder="Enter department name"
                      />
                    </div>
                  </div>


                  <div className="row mb-3">
                    <div className="col-md-3">
                      <label htmlFor="city" className={`form-label ${styles.label}`}>
                        City
                      </label>
                      <input
                        type="text"
                        className={`form-control ${styles.input}`}
                        id="city"
                        placeholder="Enter city"
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="name" className={`form-label ${styles.label}`}>
                        State
                      </label>
                      <input
                        type="text"
                        className={`form-control ${styles.input}`}
                        id="state"
                        placeholder=""
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="state" className={`form-label ${styles.label}`}>
                        Zipcode
                      </label>
                      <input
                        type="text"
                        className={`form-control ${styles.input}`}
                        id="Zipcode"
                        placeholder="Enter Zipcode"
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="country" className={`form-label ${styles.label}`}>
                        Country
                      </label>
                      <input
                        type="text"
                        className={`form-control ${styles.input}`}
                        id="country"
                        placeholder="Enter country"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="row mt-4">
                    <div className="col-md-6">
                      <button
                        type="submit"
                        className={` btn-block ${styles.primaryButton}`}
                      >
                        Confirm and update
                      </button>
                    </div>
                    <div className="col-md-6">
                      <button
                        type="button"
                        className={`btn-block ${styles.secondaryButton}`}
                      >
                        Skip and complete later
                      </button>
                    </div>
                  </div>
                </form>

                <div style ={{fontSize:'1rem'}} className="mt-4"> Need to add additional team member? <b>Send a request here  </b> </div>
              </div>

              <div className={styles.vectorParent}>
                <Ellipse2
                  className={styles.frameChild}
                  alt=""
                />
                <Ellipse1 className={styles.frameItem} alt="" />
                <RightHomeIcon
                  className={styles.rightIcon}
                  loading="lazy"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className={styles.footerText}>
            <div className={styles.description}>© 2024 iRecruit</div>
          </div>
        </section>
      </main>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Account;
