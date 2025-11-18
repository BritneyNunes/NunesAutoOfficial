import { useEffect, useState } from "react";
import { getBaseUrl } from "../Utilities/getBaseUrl";
import NavBar from "./NavBar";

const baseUrl = getBaseUrl();

function Profile() {
  const [profile, setProfile] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Get credentials from localStorage (based on your login logic)
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) {
          setMessage("No user logged in.");
          return;
        }

        const response = await fetch(`${baseUrl}/profile`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: storedUser.Email,
            password: storedUser.Password,
          }),
        });

        if (!response.ok) throw new Error("Failed to fetch profile.");
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setMessage("Error loading profile.");
      }
    };

    fetchProfile();
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
      </div>
  );

}

export default Profile;
