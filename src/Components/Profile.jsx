import { useEffect, useState } from "react";
import { getBaseUrl } from "../Utilities/getBaseUrl";
import NavBar from "./NavBar";
import Footer from './Footer'
import './Profile.css';

const baseUrl = getBaseUrl();

function Profile() {
  const [profile, setProfile] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Get user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      setMessage("No user logged in.");
      return;
    }

    // Set the profile state directly from localStorage
    setProfile({
      NameAndSurname: storedUser.NameAndSurname,
      Email: storedUser.Email,
      Gender: storedUser.Gender,
      CustomerID: storedUser.CustomerID,
      UserNumber: storedUser.UserNumber,
      createdAt: storedUser.createdAt,
      updatedAt: storedUser.updatedAt,
    });

    console.log("Profile loaded from localStorage:", storedUser);
}, []);


  return (
      <div>
        <NavBar />
        <div className="profile-container">
           <h2>User Profile</h2>

           <div className="profile-card">
              <p className="info"><strong>Full Name:</strong> {profile.NameAndSurname}</p>
              <p className="info"><strong>Email:</strong> {profile.Email}</p>
              <p className="info"><strong>Phone Number:</strong> {profile.UserNumber}</p>
              <p className="info"><strong>Gender:</strong> {profile.Gender}</p>
           </div>
        </div>
        <Footer />
      </div>
  );

}

export default Profile;
