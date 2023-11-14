import { Grid, Typography, Link } from "@mui/material";
import "../../App.css";
import CustomButton from "./CustomButton";

const FeatureItem = ({props}) => {

  return (
    <Grid container padding="50px 50px" display="flex" flexDirection={props.type === "first-fig" ? "row": "row-reverse"} style={{marginBottom: "5rem"}}>
      <Grid item md={5.5} display="flex" alignItems="center">
        <img src={props.fig} style={{ maxWidth: "100%", maxHeight: "100%" }} />
      </Grid>
      <Grid item md={1}></Grid>
      <Grid item md={5.5} display="flex" flexDirection="column" justifyContent="center">
        <Typography
          style={{
            width: "100%",
            color: "#000000",
            fontSize: "35px",
            fontWeight: "bold",
            textDecoration: "unset",
            fontFamily: "'SF Pro Display', sans-serif",
            fontWeight: 600,
            marginBottom: "1.5rem"
          }}
        >
          {props.title}
        </Typography>
        <Typography
          style={{
            width: "80%",
            color: "#717171",
            fontSize: "20px",
            margin: "10px 0px",
            textDecoration: "unset",
            lineHeight: "35px",
            fontFamily: "'SF Pro Display', sans-serif",
            marginBottom: "1.5rem",
          }}
        >
          {props.text}
        </Typography>
        <Link component="a"
                          href="https://app.gitbook.com/o/zdPfAuEYtpcuOflHlZr8/s/6YN5g2XG7tUO55uaWKUE/" // Replace with your desired URL
                          target="_blank"
                          rel="noopener noreferrer" style={{ textDecoration: 'none', fontFamily: "'SF Pro Display', sans-serif" }}>
        <CustomButton text="Learn More" type="secondary" /></Link>
      </Grid>
    </Grid>
  );
};

export default FeatureItem;