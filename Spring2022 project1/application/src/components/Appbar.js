import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ResponsiveAppBar = () => {
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  let navigate = useNavigate();

  
  const handleLogOut = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box>
            {loggedUser ? (
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Typography sx={{ fontSize: "20px" }}>
                  Welcome:{" "}
                  <span style={{ fontSize: "14px" }}>
                    {loggedUser.username}
                  </span>
                </Typography>
                <button
                  style={{
                    marginLeft: "10px",
                    borderRadius: 5,
                    padding: "5px 10px",
                  }}
                  onClick={handleLogOut}
                >
                  Log out
                </button>
                <Link
                  href="/home"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    marginLeft: 2,
                  }}
                  underline="none"
                >
                  Home
                </Link>
              </Box>
            ) : (
              <Box>
                <NavLink
                  to="/login"
                  style={{
                    color: "black",
                    textDecoration: "none",
                    padding: "10px 15px 10px 15px",
                    backgroundColor: "white",
                    borderRadius: 10,
                    marginRight: 10,
                  }}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  style={{
                    color: "black",
                    textDecoration: "none",
                    padding: "10px 15px 10px 15px",
                    backgroundColor: "white",
                    borderRadius: 10,
                  }}
                >
                  Register
                </NavLink>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
