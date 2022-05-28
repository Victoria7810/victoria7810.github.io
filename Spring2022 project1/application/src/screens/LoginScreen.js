import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { FormControl, Input, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "beige",
  ...theme.typography.body2,
  padding: theme.spacing(1),

  color: theme.palette.text.secondary,
}));

export default function LoginScreen() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  let regName = /^[a-zA-Z]/g;
  let regPwd = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/g;
  let navigate = useNavigate();
  let un, up;
  const handleUserName = (event) => {
    un = event.target.value;
    if (un.length >= 3 && un.match(regName) != null) {
      setValues({
        ...values,
        username: un,
      });
    } else {
      setValues({
        ...values,
        username: "",
      });
    }
  };

  const handlePassword = (event) => {
    up = event.target.value;
    if (up.match(regPwd) != null) {
      setValues({
        ...values,
        password: up,
      });
    } else {
      setValues({
        ...values,
        password: "",
      });
    }
  };

  const isValid = values.username !== "" && values.password !== "";

  const data = {
    username: values.username,
    password: values.password,
  };

  const handleSignIn = () => {
    if (isValid) {
      fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
        .then((response) => {
          if(response.status === 200) {
            navigate('/home');
            localStorage.setItem('user', JSON.stringify(data));
          }else{
            setErrorMsg("Password Incorrect");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Box sx={{ flexGrow: 1, position: "relative", top: "30vh" }}>
      <Grid container spacing={3}>
        <Grid item lg={4} md={3} sm={2} xs={1}></Grid>
        <Grid item lg={4} md={6} sm={8} xs={10}>
          <Item>
            <FormControl fullWidth>
              <div style={{ marginBottom: 10 }}>
                <label>User name: </label>
                <Input
                  fullWidth
                  onChange={handleUserName}
                  value={un}
                  color={values.username !== "" ? "primary" : "error"}
                />
              </div>
            </FormControl>
            <FormControl fullWidth>
              <div style={{ marginBottom: 10 }}>
                <label>Password: </label>
                <Input
                  fullWidth
                  onChange={handlePassword}
                  value={up}
                  color={values.password !== "" ? "primary" : "error"}
                />
              </div>
            </FormControl>
            <Button
              variant="contained"
              size="small"
              disabled={isValid ? false : true}
              onClick={handleSignIn}
            >
              Login
            </Button> &nbsp;&nbsp; <span style={{color: 'red'}}>{errorMsg}</span>
          </Item>
        </Grid>
        <Grid item lg={4} md={3} sm={2} xs={1}></Grid>
      </Grid>
    </Box>
  );
}
