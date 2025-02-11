import React, { useState } from "react";
import "./jobs-search.css";
import { useNavigate } from "react-router-dom";
import TopNavBar from "../components/top-nav-bar";
export default (props) => {
    const [input1, onChangeInput1] = useState("");
    const [input2, onChangeInput2] = useState("");
    const [input3, onChangeInput3] = useState("");
    const [input4, onChangeInput4] = useState("");
    const [input5, onChangeInput5] = useState("");
    const [input6, onChangeInput6] = useState("");
    const [input7, onChangeInput7] = useState("");
    const [advanceSearch, setAdvanceSearch] = useState(false)
    const [isHorizontalLayoutSelected, setIsHorizontalLayoutSelected] = useState(false)
    const navigate = useNavigate();



    const jobData = [
        {
            id: 1,
            posted: "2 days ago",
            title: "Software Engineer",
            company: "Amazon",
            location: "Gurugram, India",
            type: "Full Time",
            experience: "Fresher",
            logo: "https://i.imgur.com/1tMFzp8.png"
        },
        {
            id: 1,
            posted: "2 days ago",
            title: "Software Engineer",
            company: "Amazon",
            location: "Gurugram, India",
            type: "Full Time",
            experience: "Fresher",
            logo: "https://i.imgur.com/1tMFzp8.png"
        },
        {
            id: 1,
            posted: "2 days ago",
            title: "Software Engineer",
            company: "Amazon",
            location: "Gurugram, India",
            type: "Full Time",
            experience: "Fresher",
            logo: "https://i.imgur.com/1tMFzp8.png"
        },
        {
            id: 1,
            posted: "2 days ago",
            title: "Software Engineer",
            company: "Amazon",
            location: "Gurugram, India",
            type: "Full Time",
            experience: "Fresher",
            logo: "https://i.imgur.com/1tMFzp8.png"
        },
        {
            id: 1,
            posted: "2 days ago",
            title: "Software Engineer",
            company: "Amazon",
            location: "Gurugram, India",
            type: "Full Time",
            experience: "Fresher",
            logo: "https://i.imgur.com/1tMFzp8.png"
        },
        {
            id: 1,
            posted: "2 days ago",
            title: "Software Engineer",
            company: "Amazon",
            location: "Gurugram, India",
            type: "Full Time",
            experience: "Fresher",
            logo: "https://i.imgur.com/1tMFzp8.png"
        },
        // Add more job objects as needed
    ];

    const HorizontalJobListings = ({ jobData, bgColor, buttonName }) => {
        return (<>
            {jobData.map((job) => (
                <div className="horizontal-row-view7" onClick={() => navigate("job-details")}>
                    <div className="horizontal-column3" style={{ background: bgColor }}>
                        <div className="horizontal-row-view8">
                            <span className="horizontal-text12">{"2 days ago"}</span>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.8808 3H8.11111C6.39436 3 5 4.5655 5 6.47288V19.1498C5 20.7693 6.03972 21.453 7.31318 20.6703L11.2464 18.2321C11.6655 17.9712 12.3425 17.9712 12.7536 18.2321L16.6868 20.6703C17.9603 21.462 19 20.7783 19 19.1498V6.47288C18.9919 4.5655 17.5976 3 15.8808 3Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                        </div>
                        <span className="horizontal-text13">{"ReactJS Developer"}</span>
                    </div>
                    <div className="horizontal-job-descr">
                        <div>
                            <div className="horizontal-column4">
                                <div className="horizontal-row-view9">
                                    <button className="horizontal-button4" onClick={() => alert("Pressed!")}>
                                        <span className="horizontal-text14">{"Fresher"}</span>
                                    </button>
                                    <button className="horizontal-button4" onClick={() => alert("Pressed!")}>
                                        <span className="horizontal-text14">{"Full Time"}</span>
                                    </button>
                                    <button className="horizontal-button4" onClick={() => alert("Pressed!")}>
                                        <span className="horizontal-text14">{"Gurugram"}</span>
                                    </button>
                                </div>


                            </div>
                            <span className="horizontal-text15">{"Amazon"}</span>
                            <div className="horizontal-row-view12">
                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.666 7.16732C10.666 8.64008 9.47211 9.83398 7.99935 9.83398C6.52659 9.83398 5.33268 8.64008 5.33268 7.16732C5.33268 5.69456 6.52659 4.50065 7.99935 4.50065C9.47211 4.50065 10.666 5.69456 10.666 7.16732Z" stroke="#6E6E6E" stroke-width="1.5" />
                                    <path d="M13.3327 7.16732C13.3327 10.1128 9.33268 15.1673 7.99935 15.1673C6.66602 15.1673 2.66602 10.1128 2.66602 7.16732C2.66602 4.2218 5.05383 1.83398 7.99935 1.83398C10.9449 1.83398 13.3327 4.2218 13.3327 7.16732Z" stroke="#6E6E6E" stroke-width="1.5" />
                                </svg>

                                <span className="horizontal-text16">{"Noida, India"}</span>
                            </div>
                        </div>

                        <div className="horizontal-box"></div>
                        <button className="horizontal-button6">
                            <span className="horizontal-text17">{buttonName}</span>
                        </button>
                    </div>
                </div>

            ))}
        </>
        );
    };






    const VerticalJobListings = ({ jobData }) => {
        return (
            <div className="job-listings-grid">
                {jobData.map((job, index) => (
                    <div key={index} className="column7" onClick={() => navigate("job-details")}>
                        <div className="column8">
                            <div className="row-view13">
                                <span className="text17">{"2 days ago"}</span>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.8808 3H8.11111C6.39436 3 5 4.5655 5 6.47288V19.1498C5 20.7693 6.03972 21.453 7.31318 20.6703L11.2464 18.2321C11.6655 17.9712 12.3425 17.9712 12.7536 18.2321L16.6868 20.6703C17.9603 21.462 19 20.7783 19 19.1498V6.47288C18.9919 4.5655 17.5976 3 15.8808 3Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span className="text18">{"Software Engineer"}</span>
                            <div className="row-view11">
                                <button className="button6" onClick={() => alert("Pressed!")}>
                                    <span className="text19">{"Fresher"}</span>
                                </button>
                                <button className="button7" onClick={() => alert("Pressed!")}>
                                    <span className="text19">{"Full Time"}</span>
                                </button>
                                <button className="button8" onClick={() => alert("Pressed!")}>
                                    <span className="text19">{"Gurugram"}</span>
                                </button>
                            </div>
                        </div>
                        <div className="row-view14">
                            <div className="column9">
                                <span className="text20">{"Amazon"}</span>
                                <div className="row-view15">
                                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.666 7.16732C10.666 8.64008 9.47211 9.83398 7.99935 9.83398C6.52659 9.83398 5.33268 8.64008 5.33268 7.16732C5.33268 5.69456 6.52659 4.50065 7.99935 4.50065C9.47211 4.50065 10.666 5.69456 10.666 7.16732Z" stroke="#6E6E6E" strokeWidth="1.5" />
                                        <path d="M13.3327 7.16732C13.3327 10.1128 9.33268 15.1673 7.99935 15.1673C6.66602 15.1673 2.66602 10.1128 2.66602 7.16732C2.66602 4.2218 5.05383 1.83398 7.99935 1.83398C10.9449 1.83398 13.3327 4.2218 13.3327 7.16732Z" stroke="#6E6E6E" strokeWidth="1.5" />
                                    </svg>
                                    <span className="text21">{"Gurugram, India"}</span>
                                </div>
                            </div>
                            <button className="button9" >
                                <span className="text22">{"View Details"}</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    };


    const DefaultVerticalJobListings = ({ jobData }) => {
        return (
            <div className="job-listings-grid">
                {jobData.map((job, index) => (
                    <div className="column11" onClick={() => navigate("job-details")}>
                        <div className="column12">
                            <div className="row-view13">
                                <span className="text17">{"2 days ago"}</span>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.8808 3H8.11111C6.39436 3 5 4.5655 5 6.47288V19.1498C5 20.7693 6.03972 21.453 7.31318 20.6703L11.2464 18.2321C11.6655 17.9712 12.3425 17.9712 12.7536 18.2321L16.6868 20.6703C17.9603 21.462 19 20.7783 19 19.1498V6.47288C18.9919 4.5655 17.5976 3 15.8808 3Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                            </div>
                            <span className="text18">{"Software Engineer"}</span>
                            <div className="row-view11">
                                <button
                                    className="button6"
                                    onClick={() => alert("Pressed!")}
                                >
                                    <span className="text19">{"Fresher"}</span>
                                </button>
                                <button
                                    className="button7"
                                    onClick={() => alert("Pressed!")}
                                >
                                    <span className="text19">{"Full Time"}</span>
                                </button>
                                <button
                                    className="button8"
                                    onClick={() => alert("Pressed!")}
                                >
                                    <span className="text19">{"Gurugram"}</span>
                                </button>
                            </div>
                        </div>
                        <span className="text24">{"Amazon"}</span>
                        <div className="row-view16">
                            <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.66602 6.16732C9.66602 7.64008 8.47211 8.83398 6.99935 8.83398C5.52659 8.83398 4.33268 7.64008 4.33268 6.16732C4.33268 4.69456 5.52659 3.50065 6.99935 3.50065C8.47211 3.50065 9.66602 4.69456 9.66602 6.16732Z" stroke="#6E6E6E" stroke-width="1.5" />
                                <path d="M12.3327 6.16732C12.3327 9.11284 8.33268 14.1673 6.99935 14.1673C5.66602 14.1673 1.66602 9.11284 1.66602 6.16732C1.66602 3.2218 4.05383 0.833984 6.99935 0.833984C9.94487 0.833984 12.3327 3.2218 12.3327 6.16732Z" stroke="#6E6E6E" stroke-width="1.5" />
                            </svg>

                            <span className="text25">{"Gurugram, India"}</span>
                        </div>
                        <button className="button10">
                            <span className="text22">{"View and Apply"}</span>
                        </button>
                    </div>
                ))}
            </div>
        );
    };



    const SearchBar = () => {
        const [query, setQuery] = useState("");
        const [suggestions, setSuggestions] = useState([]);
        const [showSuggestions, setShowSuggestions] = useState(false);

        const jobSuggestions = [
            "Software Engineer",
            "Frontend Developer",
            "Backend Developer",
            "Full Stack Developer",
            "Data Scientist",
            "Project Manager",
            "UI/UX Designer",
            "DevOps Engineer",
            "Part Time"
        ];

        const handleChange = (e) => {
            const value = e.target.value;
            setQuery(value);
            if (value.trim() === "") {
                setSuggestions([]);
                setShowSuggestions(false);
                return;
            }
            const filteredSuggestions = jobSuggestions.filter((job) =>
                job.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
            setShowSuggestions(true);
        };

        const handleSelect = (suggestion) => {
            setQuery(suggestion);
            setShowSuggestions(false);
        };

        return (
            <div style={{ position: "relative", width: "100%", zIndex: '4' }}>
                <diV style={{ position: "relative", width: "100%", display: 'flex', alignItems: "center" }}>

                    <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.04492 17.6075C1.81097 12.3511 4.26121 6.27887 9.51769 4.04492C14.7742 1.81097 20.8464 4.26122 23.0803 9.51769C25.3142 14.7742 22.864 20.8464 17.6075 23.0803C12.3511 25.3143 6.27887 22.864 4.04492 17.6075ZM10.3306 5.95781C6.13063 7.74278 4.17285 12.5946 5.95781 16.7946C7.74278 20.9946 12.5946 22.9524 16.7946 21.1674C20.9946 19.3824 22.9524 14.5307 21.1674 10.3306C19.3824 6.13063 14.5307 4.17285 10.3306 5.95781Z" fill="#F2665D" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M19.4001 19.4137C19.806 19.0079 20.464 19.0079 20.8698 19.4138L28.0845 26.6294C28.4903 27.0353 28.4902 27.6933 28.0843 28.0992C27.6785 28.505 27.0205 28.5049 26.6146 28.099L19.4 20.8834C18.9942 20.4775 18.9943 19.8195 19.4001 19.4137Z" fill="#F2665D" />
                    </svg>
                    <input
                        type="text"
                        className="text8"

                        style={{ width: "100%", padding: "8px", border: "none", outline: "none", fontSize: "16px" }}
                        placeholder="Search jobs..."
                        value={query}
                        onChange={handleChange}
                        onFocus={() => setShowSuggestions(suggestions.length > 0)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    />
                    <svg style={{ marginRight: "0.5rem", cursor: 'pointer' }} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.2929 7.05L12.6964 11.6464L12.3429 12L12.6964 12.3536L17.2929 16.95L16.95 17.2929L12.3536 12.6964L12 12.3429L11.6464 12.6964L7.05 17.2929L6.70711 16.95L11.3036 12.3536L11.6571 12L11.3036 11.6464L6.70711 7.05L7.05 6.70711L11.6464 11.3036L12 11.6571L12.3536 11.3036L16.95 6.70711L17.2929 7.05Z" fill="#BBBBBB" stroke="#BBBBBB" />
                    </svg>
                    <button className="button2" onClick={() => alert("Pressed!")}>
                        <span className="text9">{"Search Job"}</span>
                    </button>

                </diV>
                {showSuggestions && (
                    <ul
                        style={{
                            position: "absolute",
                            width: "100%",
                            background: "white",
                            border: "1px solid #ccc",
                            listStyle: "none",
                            margin: 0,
                            padding: 0,
                            maxHeight: "200px",
                            overflowY: "auto",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={() => handleSelect(suggestion)}
                                style={{ padding: "8px", cursor: "pointer" }}
                                onMouseOver={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
                                onMouseOut={(e) => (e.target.style.backgroundColor = "white")}
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}





            </div>
        );
    };




    const AdvancedSearchFilter = () => {
        const [filters, setFilters] = useState({
            industry: "Engineering",
            location: "Gurugram",
            experience: "Fresher",
            category: "Full Stack Developer",
            jobType: "Full Time",
            sortBy: "1 week",
        });

        const handleChange = (e) => {
            setFilters({ ...filters, [e.target.name]: e.target.value });
        };

        const handleClearFilters = () => {
            setFilters({
                industry: "",
                location: "",
                experience: "",
                category: "",
                jobType: "",
                sortBy: "",
            });
        };

        return (
            <div className="filter-container">
                <div className="filter-box">
                    <h2 className="filter-header">Advanced Search Filter</h2>

                    {/* First Row */}
                    <div className="filter-grid">
                        <div>
                            <label className="filter-label">Industry</label>
                            <select name="industry" value={filters.industry} onChange={handleChange} className="filter-select">
                                <option value="Engineering">Engineering</option>
                            </select>
                        </div>
                        <div>
                            <label className="filter-label">Location</label>
                            <select name="location" value={filters.location} onChange={handleChange} className="filter-select">
                                <option value="Gurugram">Gurugram</option>
                            </select>
                        </div>
                        <div>
                            <label className="filter-label">Years of Experience</label>
                            <select name="experience" value={filters.experience} onChange={handleChange} className="filter-select">
                                <option value="Fresher">Fresher</option>
                            </select>
                        </div>
                    </div>

                    {/* Second Row */}
                    <div className="filter-grid">
                        <div>
                            <label className="filter-label">Job Category</label>
                            <select name="category" value={filters.category} onChange={handleChange} className="filter-select">
                                <option value="Full Stack Developer">Full Stack Developer</option>
                            </select>
                        </div>
                        <div>
                            <label className="filter-label">Job Type</label>
                            <select name="jobType" value={filters.jobType} onChange={handleChange} className="filter-select">
                                <option value="Full Time">Full Time</option>
                            </select>
                        </div>
                        <div>
                            <label className="filter-label">Sort By</label>
                            <select name="sortBy" value={filters.sortBy} onChange={handleChange} className="filter-select">
                                <option value="1 week">1 week</option>
                            </select>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="row-view11 filter-actions">
                        <button className="button3" onClick={() => { setAdvanceSearch(false) }}>
                            <span className="text14">{"Close Filter"}</span>
                        </button>
                        <button className="button4" onClick={() => alert("Pressed!")}>
                            <span className="text14">{"Clear Filters"}</span>
                        </button>
                        <div className="box"></div>
                        <button className="button5" onClick={() => alert("Pressed!")}>
                            <span className="text9">{"Apply Filters"}</span>
                        </button>
                    </div>
            
                {/* <div className="filter-actions">
              <button className="button close-button" onClick={() => setAdvanceSearch(false)}>
                Close Filter
              </button>
              <button className="button clear-button" onClick={handleClearFilters}>
                Clear Filters
              </button>
              <button className="button apply-button">
                Apply Filters
              </button>
            </div> */}
            </div>
        </div >
      );
};






return (
    <div className="contain">
        <div className="scroll-view">
            <TopNavBar />
            <div className="box2"></div>
            <div className="column">
                <div className="column2">
                    <span className="text6">{"Jobs"}</span>
                    <span className="text7">
                        {
                            "Vidhi, your career journey is important to us. Whether you choose one of these tailored positions or find something else that sparks your interest, we're here to support you every step of the way. We believe these roles are perfect for your unique skills and experiences."
                        }
                    </span>
                </div>
                <div className="column3" style={{ background: advanceSearch ? "#fafafa" : 'none' }}>
                    <div className="row-view3">
                        <SearchBar />
                    </div>
                    {advanceSearch ? <AdvancedSearchFilter /> : <div className="row-view4">
                        <div className="box"></div>
                        <div className="row-view5" style={{ cursor: 'pointer' }} onClick={() => { setAdvanceSearch(true) }}>
                            <svg style={{ marginRight: "0.5rem" }} width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" width="1.5" height="20" fill="#6E6E6E" />
                                <rect x="12" width="1.5" height="20" fill="#6E6E6E" />
                                <circle cx="3" cy="13" r="2.5" fill="#FCFCFC" stroke="#6E6E6E" />
                                <circle cx="13" cy="6" r="2.5" fill="#FCFCFC" stroke="#6E6E6E" />
                            </svg>

                            <span className="text7">{"Advance search"}</span>
                        </div>
                    </div>}


                </div>
            </div>



            <div className="column6">
                <span className="text15">{"Jobs that matches you profile"}</span>
                <div className="row-view12">
                    <span className="text16">{"Showing 1 to 6 of total 6 jobs"}</span>

                    {isHorizontalLayoutSelected === true ? <svg style={{ marginRight: "0.5rem", cursor: 'pointer' }} onClick={() => { setIsHorizontalLayoutSelected(false) }} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 10H7C9 10 10 9 10 7V5C10 3 9 2 7 2H5C3 2 2 3 2 5V7C2 9 3 10 5 10Z" stroke="#303030" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z" stroke="#303030" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M17 22H19C21 22 22 21 22 19V17C22 15 21 14 19 14H17C15 14 14 15 14 17V19C14 21 15 22 17 22Z" stroke="#303030" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z" stroke="#303030" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                        :
                        <svg width="24" style={{ marginRight: "0.5rem", cursor: 'pointer' }} height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 10H7C9 10 10 9 10 7V5C10 3 9 2 7 2H5C3 2 2 3 2 5V7C2 9 3 10 5 10Z" stroke="#BBBBBB" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z" stroke="#BBBBBB" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M17 22H19C21 22 22 21 22 19V17C22 15 21 14 19 14H17C15 14 14 15 14 17V19C14 21 15 22 17 22Z" stroke="#BBBBBB" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z" stroke="#BBBBBB" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                    }

                    {isHorizontalLayoutSelected === false ? <svg style={{ cursor: 'pointer' }} onClick={() => { setIsHorizontalLayoutSelected(true) }} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.9 13.5L4.1 13.5C2.6 13.5 2 14.14 2 15.73L2 19.77C2 21.36 2.6 22 4.1 22L19.9 22C21.4 22 22 21.36 22 19.77L22 15.73C22 14.14 21.4 13.5 19.9 13.5Z" stroke="#303030" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M19.9 2L4.1 2C2.6 2 2 2.64 2 4.23L2 8.27C2 9.86 2.6 10.5 4.1 10.5L19.9 10.5C21.4 10.5 22 9.86 22 8.27L22 4.23C22 2.64 21.4 2 19.9 2Z" stroke="#303030" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg> :

                        <svg width="24" height="24" style={{ cursor: 'pointer' }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.9 13.5L4.1 13.5C2.6 13.5 2 14.14 2 15.73L2 19.77C2 21.36 2.6 22 4.1 22L19.9 22C21.4 22 22 21.36 22 19.77L22 15.73C22 14.14 21.4 13.5 19.9 13.5Z" stroke="#BBBBBB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M19.9 2L4.1 2C2.6 2 2 2.64 2 4.23L2 8.27C2 9.86 2.6 10.5 4.1 10.5L19.9 10.5C21.4 10.5 22 9.86 22 8.27L22 4.23C22 2.64 21.4 2 19.9 2Z" stroke="#BBBBBB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    }


                </div>


                {isHorizontalLayoutSelected ? <HorizontalJobListings jobData={jobData} bgColor={'#f0f6ff'} buttonName={"View Details "} /> : <VerticalJobListings jobData={jobData} />}


            </div>


            <div className="view2">
                <div className="column10">
                    <span className="text23">{"Jobs that matches you profile"}</span>


                    <DefaultVerticalJobListings jobData={jobData} />

                </div>
            </div>


            <div className="column13">
                <span className="text28">
                    {"Some of our top clients' open positions"}
                </span>
                <span className="text29">{"Showing 1 to 6 of total 6 jobs"}</span>

                {isHorizontalLayoutSelected ? <HorizontalJobListings jobData={jobData} bgColor={'#f0f6ff'} buttonName={"View Details "} /> : <VerticalJobListings jobData={jobData} />}

            </div>
        </div>
    </div>
);
};
