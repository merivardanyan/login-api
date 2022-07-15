import React, { useState, useContext, useEffect } from "react";
import { auth, db } from "./base";
import { signOut } from "firebase/auth";
import { AuthContext } from "./AuthProvider";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { ref, onValue } from "firebase/database";

function Home() {
  const { currentUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [examResults, setExamResults] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser !== null) {
      const starCountRef = ref(db, "users/" + currentUser.uid);
      onValue(starCountRef, (snapshot) => {
        if (snapshot.exists()) {
          var data = snapshot.val();
          setUsername(data.firstName + " " + data.lastName);
          setExamResults(data.examResults);
        }
      });
    }
    else{
      return navigate('/')
    }
  }, [currentUser]);

  const clickLogin = () => {
    if (currentUser) {
      await signOut(auth).then(() => {
      navigate('/')

      });
    } else {
      navigate("/");
    }
  };

  const clickSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="mainContainer">
      <h1>Home</h1>
      {currentUser && <p>Welcome, {username + examResults}</p>}
      <div className="buttons">
        <button onClick={clickLogin}>
          {currentUser ? "Log Out" : "Login"}
        </button>
        {!currentUser && <button onClick={clickSignup}>Sign Up</button>}
      </div>
    </div>
  );
}

export default Home;