import { Box, Grid, Link, Typography } from "@mui/material";
import "../../App.css";
import CustomButton from "./CustomButton";

const NabBar = () => {

  const menuList = ["Home", "Features", "FAQs", "Contact"];

  return (
    <Grid container height="fit-content" display="flex" justifyContent="center" zIndex="20">
      <Box width="90%" display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography
            style={{
              color: "white",
              fontSize: "26px",
              fontFamily: "'SF Pro Display', sans-serif",
              fontWeight: 900,
            }}
          >
            VisAutoML
          </Typography>
        </Box>
        <Box display="flex" width="30%" minWidth="350px" justifyContent="space-between">
          {
            menuList.map((item) =>
              <Link key={item} href={item === "Home" ? "/" : `#${item}`} style={{textDecoration: "unset"}}>
                <Typography
                  style={{
                    color: "white",
                    fontSize: "22px",
                    fontWeight: 600,
                    textDecoration: "unset",
                    fontFamily: "'SF Pro Display', sans-serif",
                  }}
                >
                  {item}
                </Typography>
              </Link>
            )
          }
        </Box>
        <Box>
        <Link href="/home" passHref style={{ textDecoration: 'none', fontFamily: "'SF Pro Display', sans-serif", fontWeight: 600 }}>
        <CustomButton 
          text="Launch App" 
          type="primary" 
        />
      </Link>
          
        </Box>
      </Box>
    </Grid>
  );
};

export default NabBar;
