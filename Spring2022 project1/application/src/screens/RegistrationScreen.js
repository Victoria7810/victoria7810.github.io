import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Input,
} from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "beige",
  ...theme.typography.body2,
  padding: theme.spacing(1),

  color: theme.palette.text.secondary,
}));

export default function RegistrationScreen() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: false,
    accepted: false
  });

  const [errorMsg, setErrorMsg] = useState("");
  let mailFormat =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let regName = /^[a-zA-Z]/g;
  let regPwd = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/g;
  let navigate = useNavigate();
  let un, ue, up, ucp;
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

  const handleEmail = (event) => {
    ue = event.target.value;
    if (ue.match(mailFormat) != null) {
      setValues({
        ...values,
        email: ue,
      });
    } else {
      setValues({
        ...values,
        email: "",
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

  const handleConfirmPassword = (event) => {
    ucp = event.target.value;
    if (ucp === values.password) {
      setValues({
        ...values,
        confirmPassword: ucp,
      });
    } else {
      setValues({
        ...values,
        confirmPassword: "",
      });
    }
  };

  const handleAge = () => {
    setValues({
      ...values,
      age: true,
    });
  };

  const handleAccepted = () => {
    setValues({
      ...values,
      accepted: true,
    });
  };

  const isValid =
    values.username !== "" &&
    values.email !== "" &&
    values.password !== "" &&
    values.confirmPassword !== "" &&
    values.age !== false &&
    values.accepted !== false;

  const data = {
    username: values.username,
    email: values.email,
    password: values.password
  }
  const handleSubmit = () => {
    if (isValid) {
      fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((response) => {
        if(response.status === 201){
          navigate('/');
        }else{
          setErrorMsg("User does exist.")
        }
      })
      .catch(error => {
        console.log("Error", error);
      })
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        position: "relative",
        top: "30vh",
        backgroundColor: "",
      }}
    >
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
                <label>Email: </label>
                <Input
                  fullWidth
                  onChange={handleEmail}
                  value={ue}
                  color={values.email !== "" ? "primary" : "error"}
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
            <FormControl fullWidth>
              <div style={{ marginBottom: 10 }}>
                <label>Confirm Password: </label>
                <Input
                  fullWidth
                  onChange={handleConfirmPassword}
                  value={ucp}
                  color={values.confirmPassword !== "" ? "primary" : "error"}
                />
              </div>
            </FormControl>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox size="small" onClick={handleAge} />}
                label="I am 13 years of age or older."
              />
              <FormControlLabel
                control={<Checkbox size="small" onClick={handleAccepted} />}
                label="I accept Terms of Service and Privacy Rules."
              />
            </FormGroup>
            <Button
              variant="contained"
              size="small"
              disabled={isValid ? false : true}
              onClick={handleSubmit}
            >
              Submit
            </Button> &nbsp;&nbsp; <span style={{color: 'red'}}>{errorMsg}</span>
          </Item>
        </Grid>
        <Grid item lg={4} md={3} sm={2} xs={1}></Grid>
      </Grid>
    </Box>
  );
}
