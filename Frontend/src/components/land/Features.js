import { Grid, Typography, Box } from "@mui/material";
import "../../App.css";
import FeatureItem from "./FeatureItem";

const Features = () => {

  const itemList = [
    {
      fig: "./img/land/dataclean.png",
      title: "Automate Data Cleaning, Transformation, Splitting and more",
      text: "Streamline your data preparation with VisAutoML's automated preprocessing. Ready your data for analysis and modeling effortlessly with just a few clicks.",
      type: "first-fig"
    },
    {
      fig: "./img/land/userfriendly.png",
      title: "User Friendly UI and Designed for Non-Expert ML Users",
      text: "Enjoy machine learning made easy with our AutoML tool's intuitive interface designed for users of all skill levels. Experience simplified workflows and powerful features with no prior expertise needed.",
      type: "first-text"
    },
    {
      fig: "./img/land/automate.png",
      title: "Automate Model Training and Testing Without a Single Line of Code",
      text: "VisAutoML offers peak convenience by automating model training and testing without coding. Effortlessly tap into machine learning while focusing on insights as our tool simplifies the process.",
      type: "first-fig"
    },
  ]

  return (
    <Grid container id="Features" position="relative" zIndex="0">
      <Box position="absolute" left="-135px" top="100px" zIndex="-1">
        <img src="./img/land/Ellipse2.png" style={{ maxWidth: "270px", maxHeight: "270px" }} />
      </Box>
      <Typography
        width="100%"
        textAlign="center"
        style={{
          color: "#333333",
          fontSize: "65px",
          margin: "150px 0px 100px",
          fontFamily: "'SF Pro Display', sans-serif",
          fontWeight: 600,
        }}
      >
        Features
      </Typography>
      {
        itemList.map(item =>
          <FeatureItem key={item.title} props={item} />
        )
      }
    </Grid>
  );
};

export default Features;