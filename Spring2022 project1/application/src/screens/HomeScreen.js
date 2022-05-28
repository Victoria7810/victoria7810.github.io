import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ViewImageScreen from "./ViewImageScreen";
import { Typography } from "@mui/material";

export default function SearchBar() {
  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState("");
  const [imgView, setImgView] = useState([]);
  const [search, setSearch] = useState("");

  let formData = new FormData();

  useEffect(() => {
    fetch("http://localhost:3001/allImages")
      .then((response) => response.json())
      .then((data) => {
        setImgView(data);
      })
      .catch((error) => console.log("Error", error));
  }, []);


  const selectedImage = (event) => {
    let img = event.target.files[0];
    setImage(img);
  };

  const inputHandle = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value);
  };

  const submitHandle = (event) => {
    event.preventDefault();
    formData.append("image", image);
    if (image != null) {
      fetch("http://localhost:3001/image", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          console.log("this is response", response);
          if (response.status === 200) {
            setMsg(response.statusText);
            window.location.reload();
          } else {
            setMsg("Please upload image.");
          }
        })
        .catch((error) => console.log("Error", error));
    }
  };
  

  const isValid = image === null;
  return (
    <Box sx={{ marginTop: "50px" }}>
      <Grid container spacing={3}>
        <Grid item lg={3} md={3} sm={3} xs={2}></Grid>
        <Grid item lg={6} md={4} sm={4} xs={8}>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: { lg: "800px", md: "600px", sm: "400px" },
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search for photos"
              inputProps={{ "aria-label": "search google maps" }}
              value={search}
              onChange={inputHandle}
            />
            <Divider
              sx={{ height: 28, m: 0.5, marginRight: 3 }}
              orientation="vertical"
            />
            <Box sx={{ display: "inline-block" }}>
              <label htmlFor="contained-button-file">
                {isValid ? (
                  <input
                    name="image"
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={selectedImage}
                  />
                ) : (
                  <>
                    <input
                      name="image"
                      accept="image/*"
                      id="contained-button-file"
                      multiple
                      type="file"
                      onChange={selectedImage}
                    />
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "gray",
                        color: "white",
                        fontWeight: "bold",
                        width: "150px",
                      }}
                      size="small"
                      component="span"
                      onClick={submitHandle}
                    >
                      POST
                    </Button>
                  </>
                )}
              </label>
            </Box>
            <Box>
              <Typography
                sx={{
                  color: "green",
                  fontWeight: "bold",
                  marginLeft: 2,
                  marginRight: 2,
                }}
              >
                {msg}
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>

      {imgView !== "" ? (
        <Box sx={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}>
          <ViewImageScreen
            value={imgView}
            search={search}
          />
        </Box>
      ) : (
        <>
        </>
      )}
    </Box>
  );
}
