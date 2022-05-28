import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { TextField, Typography, Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  width: "450px",
  height: "450px",
  color: theme.palette.text.secondary,
  marginBottom: 30,
}));

const SingleScreen = (props) => {
  const [commentResult, setCommentResult] = useState({
    comment: "",
    image_name: null,
  });
  const [imgName, setImgName] = useState(null);
  const [displayCom, setDisplayCom] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setImgName(props.clickValue);
    fetch("http://localhost:3001/getcomment")
      .then((response) => response.json())
      .then((data) => {
        let arr = [];
        for (let i = 0; i < Object.values(data).length; i++) {
          arr.push(Object.values(data[i]));
        }
        const res = arr
          .filter((val) => {
            if (props.clickValue === "") {
              return val;
            } else if (val.includes(props.clickValue)) {
              return val;
            }
          })
          .map((item) => {
            return item[2];
          });
        setDisplayCom(res);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, [props.clickValue, commentResult]);

  const commentHandle = (event) => {
    let inputComment = event.target.value;
    setCommentResult({
      comment: inputComment,
      image_name: props.clickValue,
    });
  };

  const submitComment = (event) => {
    fetch("http://localhost:3001/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentResult),
    })
      .then((response) => {
        if (response.status === 200) {
          window.location.reload();
          console.log("Done");
        } else {
          console.error("Failed.");
        }
      })
      .catch((error) => console.log("Error", error));
  };

  return (
    <Box sx={{ marginTop: 20 }}>
      <Grid container spacing={4}>
        <Grid item lg={2}></Grid>
        <Grid item>
          <Item>
            <img
              src={require(`../images/${props.clickValue}`)}
              alt=""
              style={{
                width: "450px",
                height: "450px",
              }}
            />
          </Item>
          <TextField
            sx={{ width: "465px" }}
            value={commentResult.comment}
            onChange={commentHandle}
          ></TextField>
          <Box sx={{ marginTop: 1 }}>
            <Button variant="contained" size="small" onClick={submitComment}>
              Submit
            </Button>
          </Box>
        </Grid>
        <Grid item lg={3}>
          <Typography>Comment: </Typography>
          {displayCom.map((item) => {
            return (
              <>
                <Box>
                  <Typography sx={{ fontSize: "20px" }}>{item}</Typography>
                </Box>
                <Divider />
              </>
            );
          })}
        </Grid>
      </Grid>
    </Box>
  );
};

export default SingleScreen;
