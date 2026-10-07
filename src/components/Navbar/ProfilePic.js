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
    <div className="profile-control">
      {user ? (
        <button
          type="button"
          className="profile-button"
          onClick={handleLogout}
          aria-label="Log out"
          title="Log out"
        >
          <img className="avatar" src={profilePic} alt="" />
        </button>
      ) : (
        <Link
          to="/login"
          className="profile-link"
          aria-label="Log in"
          title="Log in"
        >
          <img className="avatar" src={profilePic} alt="" />
        </Link>
      )}
    </div>
  );
};

export default ProfilePic;
