import { Box, Grid } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { reset } from "../actions/modelAction";
import Navbar from "../components/common/Navbar";
import BackDialog from "../components/explain/BackDialog";
import Body from "../components/explain/Body";
import "../App.css";

const Model = () => {
  const [backDialogOpen, setBackDialogOpen] = useState(false);
  const [sidebarOpen, setSideBarOpen] = useState(false);

  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };

  return (
    <Grid container sx={{ display: "flex", flexWrap: "nowrap !important" }}>
      <Grid item>
        <Navbar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar}/>
      </Grid>
      <Grid item className="main">
        <Body
          backDialogOpen={backDialogOpen}
          setBackDialogOpen={setBackDialogOpen}
        />
      </Grid>
      <BackDialog open={backDialogOpen} setOpen={setBackDialogOpen} />
    </Grid>
  );
};

export default Model;