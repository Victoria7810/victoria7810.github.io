import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Typography, Link } from "@mui/material";
import SingleScreen from "./SingleScreen";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  width: "200px",
  height: "200px",
  color: theme.palette.text.secondary,
  marginBottom: 30,
}));

const ViewScreen = (props) => {
  let images = props.value;
  let searchTerm = props.search;
  const [visibleComp, setVisibleComp] = useState(true);
  const [clickValue, setClickValue] = useState("");

  const displayView = () => {
    return images
      .filter((val) => {
        if (searchTerm === "") {
          return val;
        } else if (
          val.file_name.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return val;
        }
      })
      .map((item, index) => {
        return (
          <Grid item lg={2} key={item.id} >
            <Box>
              <Item>
                <Link underline="none" href="/single" onClick={(event) => {
                   event.preventDefault();
                   setClickValue(item.image_name);
                   setVisibleComp(!visibleComp);
                }}>
                  <img
                    src={require(`../images/${item.image_name}`)}
                    alt=""
                    style={{
                      width: "200px",
                      height: "200px",
                      marginBottom: "3px",
                    }}
                  />
                  <Typography sx={{ textAlign: "center" }}>
                    {item.file_name}
                  </Typography>
                </Link>
              </Item>
            </Box>
          </Grid>
        );
      });
  };

  return (
    <Box>
      {visibleComp ? (
        <Grid container>
          <Grid item></Grid>
          {displayView()}
          <Grid item></Grid>
        </Grid>
      ) : (
        <SingleScreen clickValue={clickValue} />
      )}
    </Box>
  );
};

export default ViewScreen;
