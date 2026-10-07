import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/firebase-config";
import profilePic from "../../assets/profilePhoto.png";

const ProfilePic = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Unable to sign out", error);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <img
            onClick={handleLogout}
            className="avatar"
            src={profilePic}
            alt="Log out"
            title="Log out"
          />
        </div>
      ) : (
        <div>
          <Link to="/login" aria-label="Log in">
            <img className="avatar" src={profilePic} alt="Log in" title="Log in" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfilePic;
