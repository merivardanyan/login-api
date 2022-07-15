import React, { useState, useContext, useEffect } from "react";
import { auth, db } from "./base";
import { signOut } from "firebase/auth";
import { AuthContext } from "./AuthProvider";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

function Home() {
  const { currentUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [examResults, setExamResults] = useState("");
  const navigate = useNavigate();
  let passed;
  useEffect(() => {
    if (currentUser !== null) {
      const starCountRef = ref(db, "users/" + currentUser.uid);
      onValue(starCountRef, (snapshot) => {
        if (snapshot.exists()) {
          var data = snapshot.val();
          setUsername(data.firstName + " " + data.lastName);
          setExamResults(data.examResults);
          console.log(data.examResults);
        }
      });
    } else {
      return navigate("/");
    }
  }, [currentUser]);
  if (examResults >= 5) {
    passed = "passed";
  } else if (examResults < 5) {
    passed = "not passed";
  }
  console.log(examResults);
  const clickLogin = () => {
    if (currentUser) {
      signOut(auth);
      navigate("/");
    } else {
      navigate("/");
    }
  };

  const clickSignup = () => {
    navigate("/signup");
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Container className="header">
        <Box sx={{ backgroundColor: "primary.main", color: "#fff" }}>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
            Dashboard
          </Button>
        </Box>
      </Container>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
        <MenuItem>{username}</MenuItem>
        <MenuItem onClick={clickLogin}>Logout</MenuItem>
      </Menu>
      <Box
        justifyContent="center"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justify: "center",
          "& > :not(style)": {
            m: 1,
            width: 128,
            height: 128,
          },
        }}
      >
        <Paper elevation={3}>
          <div style={{ marginTop: "10px" }}>
            <span style={{ color: "#1976d2" }}>Exam Result</span>
            <span>Your score is</span>
            <h3>{examResults} of 10</h3>
            <span>{passed}</span>
          </div>
        </Paper>
      </Box>
    </div>
  );
}

export default Home;
