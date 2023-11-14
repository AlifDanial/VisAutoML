import { Box, Grid, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { reset } from "../actions/modelAction";
import Navbar from "../components/common/Navbar";
import Body from "../components/home/Body";
import "../App.css";

const Home = () => {
  const [sidebarOpen, setSideBarOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reset());
  }, []);

  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };

  return (
    // <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Grid container sx={{ display: "flex", flexWrap: "nowrap !important" }}>
        <Grid item>
          <Navbar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar}/> 
        </Grid>
        <Grid item className="main">
          <Body />
        </Grid>
      </Grid>
    // </Box>
  );
};

export default Home;
