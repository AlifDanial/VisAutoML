import { Box, Grid, Typography } from "@mui/material";
import "../../App.css";
import NabBar from "./NabBar";
import asset1 from "../../static/images/land/asset-1.png";
import backline from "../../static/images/land/backline.png";
import ellipse1 from "../../static/images/land/Ellipse1.png";
import mockup from "../../static/images/land/Mockup.png";

const MainContent = () => {

  return (
    <Grid container position="relative" width="100%" height="700px" display="flex" flexDirection="column" sx={{ backgroundImage: "linear-gradient(45deg, #1E5AF9, #1D59F8)", paddingTop: "50px" }}>
      <NabBar />
      <Box width="100%" zIndex="0" marginTop="50px">
        <Box position="absolute" width="100%" display="flex" justifyContent="space-between" zIndex="-1" bottom="0px">
          <Box><img src={asset1} style={{maxWidth:"400px", maxHeight:"600px"}} /></Box>
          <Box sx={{visibility: {lg: "visible", md: "visible", sm: "hidden", xs: "hidden"}}}><img src="./img/land/asset-2.png" style={{maxWidth:"400px", maxHeight:"600px"}} /></Box>
        </Box>
        <Box position="absolute" width="100%" height="750px" top="0" left="0" display="flex" justifyContent="center" zIndex="-1">
          <img src={backline} width="1300px"/>
        </Box>
        <Box position="absolute" right="-170px" top="-170px" zIndex="-1">
          <img src={ellipse1} style={{maxWidth:"300px", maxHeight:"300px"}}/>
        </Box>
        <Box position="absolute" left="48vw" justifyContent="center" alignItems="center" overflow="hidden" zIndex="-1" sx={{display: {lg: "block", md: "block", sm: "none", xs: "none"}}}>
          <img src={mockup} />
        </Box>
        <Box width="650px" display="flex" flexDirection="column" marginTop="50px" marginLeft="10vw" zIndex="20">
          <Typography
            style={{
              color: "white",
              fontSize: "65px",
              fontWeight: "bold",
              textDecoration: "unset",
              lineHeight: '1.22',
              marginBottom: '1rem',
              fontFamily: "'SF Pro Display', sans-serif",
            }}
          >
            Unlock Your<br />
            Data With<br />
            Machine Learning
          </Typography>
          <Typography
            style={{
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
              textDecoration: "unset",
              fontFamily: "'SF Pro Display', sans-serif",
            }}
          >
            Automate machine learning to gain insights on your data <br /> with zero coding required
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export default MainContent;