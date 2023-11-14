import { Box, Grid, Typography } from "@mui/material";
import "../../App.css";
import { useState } from "react";

const FaqItem = ({ props }) => {
  const [activate, setActivate] = useState("false");
  const handleClick = () => {
    setActivate(prev => !prev)
  }
  return (
    <Grid
      container
      display="flex"
      flexDirection="row"
      width="800px"
      borderRadius="10px"
      padding="20px"
      margin="20px 0px"
      style={{
        boxShadow: activate ? "2px 2px 10px rgb(0,0,0,0.2)" : "",
        backgroundColor : activate ? "white" : "#F6F6F6",
        minHeight: activate ? "130px" : "72px",
        transition: "0.4s"
      }}
      onClick={handleClick}
    >
      <Box display="flex">
        <svg xmlns="http://www.w3.org/2000/svg" width="40.967" height="40.967" viewBox="0 0 40.967 40.967">
          <g id="Group_2" dataname="Group 2" transform="translate(-509.155 -215.219)">
            <line id="Line_19" dataname="Line 19" y2="40.967" transform="translate(529.639 215.219)" fill="none" stroke={activate ? "none" : "#000"} strokeWidth="3" />
            <line id="Line_20" dataname="Line 20" y2="40.967" transform="translate(550.122 235.702) rotate(90)" fill="none" stroke={activate ? "#F00" : "#000"} strokeWidth="3" />
          </g>
        </svg>
      </Box>
      <Box display="flex" width="90%" flexDirection="column" alignItems="flex-start" margin="0px 0px 0px 30px">
        <Typography
          fontSize="22px"
          style={{
            color: "#434343",
            margin: "5px 0px",
            fontFamily: "'SF Pro Display', sans-serif",   
            fontWeight: 500,         

          }}
        >
          {props.question}
        </Typography>
        <Typography width="100%" fontSize="20px" style={{ color: "#6E6E6E", marginTop: "20px", display: activate ? "block": "none", fontFamily: "'SF Pro Display', sans-serif", }}>{props.answer}</Typography>
      </Box>
    </Grid>
  );
};

export default FaqItem;