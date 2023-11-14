import { Box, Grid, Card, Link, Typography, Button, ButtonGroup, Divider, Lavel, Tooltip, Icon } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PsychologyIcon from '@mui/icons-material/Psychology';
import HomeIcon from '@mui/icons-material/Home';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import CachedIcon from '@mui/icons-material/Cached';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import "../../App.css";
import { BiNetworkChart } from "react-icons/bi";
import { RiHomeLine } from "react-icons/ri";
import { FaDatabase } from "react-icons/fa";
import { BsEyeglasses } from "react-icons/bs";
import { GoSettings } from "react-icons/go";
import { MdOutlineVisibility } from "react-icons/md";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch } from "react-redux";
import { withStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { ArrowForwardIos } from "@mui/icons-material";

const CustomTooltip = withStyles({
  tooltip: {
    minWidth: "450px",
    textAlign: "center",
  }
})(Tooltip);

const Navbar = (props) => {
  const [active, setActive] = useState("home");
  const [devMode, setDevMode] = useState();
  const [navState, setNavState] = useState(false);
  const [tooltipId, setTooltipId] = useState(-2);

  const { mode } = useSelector(state => state.model);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    switch (location.pathname) {
      case "":
        setActive("landing");
        break;
      case "/home":
        setActive("home");
        break;
      case "/dataset":
        setActive("dataset");
        break;
      case "/select":
        setActive("select");
        break;
      case "/review":
        setActive("review");
        break;
      case "/model":
        setActive("model");
        break;

      default:
        break;
    }
  }, []);

  useEffect(() => {
    console.log(mode);
    if (mode < 0) setDevMode(true);
    else setDevMode(false);
    setTooltipId(mode);
    console.log(mode);
  }, [mode]);

  const onClick = (link) => { };

  const handleOpen = () => { };

  const handleClose = () => { };

  const onDevModeHandler = () => {
    let payload = -1;
    if (devMode) {
      switch (active) {
        case 'home':
          payload = 2;
          break;
        case 'dataset':
          payload = 10;
          break;
        case 'review':
          console.log("Review is active on NAVBAR", payload);
          payload = 15;
          break;
        case 'select':
          console.log("Select is active on NAVBAR", payload);
          payload = 23;
          break;
        case 'model':
          console.log("Select is active on NAVBAR", payload);
          payload = 34;
          break;

        default:
          break;
      }
    }
    console.log(payload);
    dispatch({ type: "TOGGLE_MODE", payload: payload });
    setDevMode(!devMode);
  }

  const sidebarClass = props.isOpen ? "sidebarShow" : "sidebarHidden";

  return (
    <div id="#navbar" className={`${sidebarClass} navbar`}>
      <Grid container sx={{ height: "100%", padding: "10px" }}>
        <Grid item xs={12}
          sx={{
            textAlign: "center",
            display: "flex",
            height: "10%",
            marginTop: "1em"
          }}
        >

          <BiNetworkChart size="1.5625em"/>
          <Link
            sx={{
              color: "#000000",
            }}
            underline="none"
            href="/home"
          >
            <Typography
              sx={{
                fontWeight: "bolder",
              fontFamily: "Open Sans",
              fontSize: "1.3rem",
              color: "black",
              marginLeft:"0.8rem"
              }}
            >
              VisAutoML
            </Typography>
          </Link>
          {/* {props.isOpen ? <ChevronLeftIcon/>: <ChevronRightIcon/>}
              Show Navbar */}
          <IconButton
            className="sidebarOpen"
            edge="start"
            aria-label="menu"
            sx={{ marginTop: "12px", color: "#1A97F5", marginLeft: `${props.isOpen ? "185px" : "-15px"}` }}
            onClick={props.toggleSidebar}
          >
            {props.isOpen ? <ArrowCircleLeftIcon fontSize="large" color="inherit" /> : <ArrowCircleRightIcon fontSize="large" color="inherit" />}
          </IconButton>
        </Grid>
        <Grid item xs={12} sx={{ padding: "0 5px", height: "70%" }}>
          <Typography
            sx={{
              fontFamily: "'SF Pro Display', sans-serif",
              fontSize: "0.9em",
              fontWeight: "500",
              color: "#c0c5cc"
            }}
          >
            MENU
          </Typography>
          <Link
            underline="none"
            sx={{
              margin: "15px 0",
              padding: "5px 15px",
              cursor: "default",
              display: "flex",
              alignItems: "center",
              color: active === "home" ? "#ffffff" : "#d1d1d1",
              backgroundColor: active === "home" ? "#1a97f5" : "#FFFFFF",
              borderRadius: "5px",
            }}
            onClick={() => onClick("/home")}
          >
            <RiHomeLine />
            <Typography
              sx={{
                textAlign: "left",
                fontWeight: "bold",
                fontFamily: "'SF Pro Display', sans-serif",
                marginLeft: "10px"
              }}
            >
              Home
            </Typography>
          </Link>
          <Typography
            sx={{
              fontFamily: "'SF Pro Display', sans-serif",
              fontSize: "1em",
              fontWeight: "500",
              color: "#c0c5cc"
            }}
          >
            DATA
          </Typography>
          <Link
            underline="none"
            sx={{
              margin: "15px 0",
              padding: "5px 15px",
              color: active === "dataset" ? "#ffffff" : "#d1d1d1",
              backgroundColor: active === "dataset" ? "#1a97f5" : "#FFFFFF",
              borderRadius: "5px",
              cursor: "default",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => onClick("/dataset")}
          >
            <FaDatabase />
            <Typography
              sx={{
                textAlign: "left",
                fontWeight: "bold",
                fontFamily: "'SF Pro Display', sans-serif",
                marginLeft: "10px"
              }}
            >
              Import
            </Typography>
          </Link>
          <Link
            underline="none"
            sx={{
              margin: "10px 0",
              padding: "5px 15px",
              color: active === "review" ? "#ffffff" : "#d1d1d1",
              backgroundColor: active === "review" ? "#1a97f5" : "#FFFFFF",
              borderRadius: "5px",
              cursor: "default",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => onClick("/review")}
          >
            <BsEyeglasses />
            <Typography
              sx={{
                textAlign: "left",
                fontWeight: "bold",
                fontFamily: "'SF Pro Display', sans-serif",
                marginLeft: "10px"
              }}
            >
              Preprocessing
            </Typography>
          </Link>
          <Typography
            sx={{
              fontFamily: "'SF Pro Display', sans-serif",
              fontSize: "1em",
              fontWeight: "500",
              color: "#c0c5cc"
            }}
          >
            MODEL
          </Typography>
          <Link
            underline="none"
            sx={{
              margin: "15px 0",
              padding: "5px 15px",
              color: active === "select" ? "#ffffff" : "#d1d1d1",
              backgroundColor: active === "select" ? "#1a97f5" : "#FFFFFF",
              borderRadius: "5px",
              cursor: "default",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => onClick("/select")}
          >
            <GoSettings />
            <Typography
              sx={{
                textAlign: "left",
                fontWeight: "bold",
                fontFamily: "'SF Pro Display', sans-serif",
                marginLeft: "10px"
              }}
            >
              Training
            </Typography>
          </Link>
          <Link
            underline="none"
            sx={{
              margin: "10px 0",
              padding: "5px 15px",
              color: active === "model" ? "#ffffff" : "#d1d1d1",
              backgroundColor: active === "model" ? "#1a97f5" : "#FFFFFF",
              borderRadius: "5px",
              cursor: "default",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => onClick("/model")}
          >
            <MdOutlineVisibility />
            <Typography
              sx={{
                textAlign: "left",
                fontWeight: "bold",
                fontFamily: "'SF Pro Display', sans-serif",
                marginLeft: "10px"
              }}
            >
              Evaluation
            </Typography>
          </Link>
        </Grid>
        <Grid item xs={12} sx={{ padding: "0 5px", height: "15%" }}>
          <Grid container>
            <Grid item xs={12}>
              <Typography
                sx={{
                  fontFamily: "'SF Pro Display', sans-serif",
                  fontSize: "1em",
                  fontWeight: "500",
                  color: "grey",
                  textAlign: "center"
                }}
              >
                Development Mode
              </Typography>
            </Grid>
            <CustomTooltip
              open={tooltipId === -1 ? true : false}
              onOpen={handleOpen}
              onClose={handleClose}
              title={
                <Box padding="10px" display="flex" flexDirection="column" gap="10px">
                  <Typography>Activate 'Easy Mode' for guided assistance</Typography>
                  <Box style={{ textAlign: "end" }}>
                    <Button variant="contained" onClick={() => dispatch({ type: "TOGGLE_MODE", payload: -2 })}>OKAY</Button>
                  </Box>
                </Box>
              }
              placement="right"
              arrow
            >
              <Box>
                <CustomTooltip
                  open={tooltipId === 2 ? true : false}
                  onOpen={handleOpen}
                  onClose={handleClose}
                  title={
                    <Box padding="10px" display="flex" flexDirection="column" gap="10px">
                      <Typography>Switch between 'Easy' and 'Expert' modes depending on
                        your comfort level. New? Start with Easy!</Typography>
                      <Box style={{ textAlign: "end" }}>
                        <Button variant="contained" endIcon={<ArrowForwardIos />} onClick={() => dispatch({ type: "TOGGLE_MODE", payload: 3 })}>NEXT</Button>
                      </Box>
                    </Box>
                  }
                  placement="right"
                  arrow
                >
                  <Grid item xs={12} sx={{ textAlign: "center", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ButtonGroup
                      disableElevation
                      variant="contained"
                      sx={{ marginTop: "1em", marginLeft:"0.7em" }}
                    >
                      <Button
                        style={
                          devMode ? {
                            backgroundColor: "rgba(0, 0, 0, 0.12)",
                            color: "rgba(0, 0, 0, 0.26)"
                          } : {
                            backgroundColor: "#1565c0",
                            color: "white"
                          }}
                        onClick={onDevModeHandler}
                        disabled={devMode ? false : true}
                      >
                        Easy
                      </Button>
                      <Button
                        style={
                          devMode ? {
                            backgroundColor: "#1565c0",
                            color: "white"
                          } : {
                            backgroundColor: "rgba(0, 0, 0, 0.12)",
                            color: "rgba(0, 0, 0, 0.26)"
                          }}
                        onClick={onDevModeHandler}
                        disabled={devMode ? true : false}
                      >
                        Expert
                      </Button>
                    </ButtonGroup>
                  </Grid>
                </CustomTooltip>
              </Box>
            </CustomTooltip>
          </Grid>
        </Grid>
      </Grid>
    </div >
  );
};

export default Navbar;
