import { Grid } from "@mui/material";
import "../App.css";
import MainContent from "../components/land/MainContent";
import Features from "../components/land/Features";
import Faqs from "../components/land/Faqs";
import ContactUs from "../components/land/ContactUs";

const Land = () => {

  return (
    <Grid container style={{backgroundColor: "white"}} overflow="hidden">
      <MainContent />
      <Features />
      <Faqs />
      <ContactUs />
    </Grid>
  );
};

export default Land;