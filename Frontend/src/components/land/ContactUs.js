import { Grid, Box, Typography, Input, InputLabel } from "@mui/material";
import "../../App.css";
import CustomButton from "./CustomButton";

const ContactUs = () => {

  return (
    <Grid container id="Contact" position="relative" zIndex="0">
      <Box position="absolute" left="-135px" top="200px" zIndex="-1">
        <img src="./img/land/Ellipse2.png" style={{ maxWidth: "270px", maxHeight: "270px" }} />
      </Box>
      <Typography
        width="100%"
        textAlign="center"
        style={{
          color: "#333333",
          fontSize: "65px",
          marginTop: "150px",
          fontFamily: "'SF Pro Display', sans-serif",
          fontWeight: 600,

        }}
      >
        Contact Us
      </Typography>
      <Grid container padding="12vw">
        <Grid item md={5.5} display="flex" flexDirection="column" justifyContent="space-around">
          <Typography
            sx={{
              width: "100%",
              color: "#000000",
              fontSize: "55px",
              fontWeight: "bold",
              textDecoration: "unset",
              fontFamily: "'SF Pro Display', sans-serif",

            }}
          >
            Any feedback?<br />
            Fill out the form.
          </Typography>
          <br />
          <InputLabel sx={{fontFamily: "'SF Pro Display', sans-serif",}}>FIRST AND LAST NAME</InputLabel>
          <br />
          <Input type="text" fullWidth />
          <br />
          <InputLabel sx={{fontFamily: "'SF Pro Display', sans-serif",}}>EMAIL</InputLabel>
          <br />
          <Input type="email" fullWidth />
          <br />
          <InputLabel sx={{fontFamily: "'SF Pro Display', sans-serif",}}>DESCRIPTION</InputLabel>
          <br />
          <Box height="200px">
            <textarea style={{width: "100%", height: "200px"}}></textarea>
          </Box>
          <br />
          <CustomButton type="contact" text="SUBMIT" />
        </Grid>
        <Grid item md={1}></Grid>
        <Grid item md={5.5} display="flex" flexDirection="column" alignItems="center">
          <img
            src="./img/land/contactus.png"
            style={{
              maxWidth: "100%",
              maxHeight: "100%"
            }}
          />
          <Typography
            width="100%"
            textAlign="center"
            style={{
              color: "#333333",
              fontSize: "18px",
              fontFamily: "'SF Pro Display', sans-serif",
            }}
          >
            LET'S COLLABORATE
          </Typography>
          <Typography
            width="100%"
            textAlign="center"
            style={{
              color: "#333333",
              fontSize: "35px",
              fontWeight: "bold",
              fontFamily: "'SF Pro Display', sans-serif",
            }}
          >
            alifd.work@gmail.com
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ContactUs;