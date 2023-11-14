import { Box, Grid } from "@mui/material";
import { useState } from "react";
import Navbar from "../components/common/Navbar";
import BackDialog from "../components/dataset/BackDialog";
import Body from "../components/dataset/Body";
import "../App.css";
// import ReactDOM from "react-dom";
// import CsvViewer from "react-csv-viewer";


const Dataset = () => {
  const [backDialogOpen, setBackDialogOpen] = useState(false);
  const [sidebarOpen, setSideBarOpen] = useState(false);

  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };

  return (
    <Grid container sx={{ display: "flex", flexWrap: "nowrap" }}>
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
      {/* <CsvViewer /> */}
    </Grid>
  );
};

export default Dataset;
