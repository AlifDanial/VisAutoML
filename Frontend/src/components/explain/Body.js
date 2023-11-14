import { Box, Grid, Paper, Button, Card, Divider, IconButton, Typography, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RefreshIcon from '@mui/icons-material/Refresh';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import EditDialog from "../common/EditDialog";
import "../../App.css";
import { useNavigate } from 'react-router-dom'; // make sure you've installed react-router-dom
import HelpIcon from '@mui/icons-material/Help';
import LoadingDialog from "./LoadingDialog";
import { withStyles } from "@mui/styles";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const Body = ({ backDialogOpen, setBackDialogOpen }) => {
  const navigate = useNavigate();
  const [refreshCount, setRefreshCount] = useState(0);
  const {  name, type,  } = useSelector((state) => state.model);
  const [loading, setLoading] = useState(true);
  const [openEdit, setOpenEdit] = useState(false);
  const [loadingOpen, setLoadingOpen] = useState(false);

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#5C5C5C',
      color: '#ffffff',
      minWidth: "450px",
      textAlign: "center",
      fontSize: theme.typography.pxToRem(14),
      border: '1px solid #dadde9',
      borderRadius: '10px',
      padding: '1em',
      fontFamily: "'SF Pro Display', sans-serif",
  
    },
  }));
  
  const CustomTooltip = withStyles({
    tooltip: {
      minWidth: "450px",
      textAlign: "center",
    }
  })(Tooltip);

  const handleBack = () => {
    setBackDialogOpen(true);
  };
  const handleRefresh = () => {
    console.log('Refreshing Box...');
    setLoading(true);
    setRefreshCount(prevCount => prevCount + 1);
  }

  const handleLoad = () => {
    setLoading(false);
  }

  // This function will navigate to the "/review" route when called
  const handleBack1 = () => {
    navigate("/select");
  };

  const { mode } = useSelector((state) => state.model);

  const [tooltipId, setTooltipId] = useState(0);

  const dispatch = useDispatch();

  const handleOpen = () => { };

  const handleClose = () => { };

  useEffect(() => {
    setTooltipId(mode);
  }, [mode]);

  const onClick = () => {
    setLoadingOpen(true);
  }

  return (
    <Grid className="main"
      sx={{
        flex: 1,
        backgroundColor: "#F5F5F5",
        overflowX: "hidden",
        overflowY: "auto",
        padding: "30px",
      }}
    > 
      <Paper sx={{width: "100%", height: "100%", padding: "20px", borderRadius: "20px"}}>
        <Grid container sx={{height: "100%"}}>
          <Grid item xs={12}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 2
            }}
          >
            <Grid
              sx={{
                display: "flex",
                alignItems: "center"
              }}
            >
              <IconButton onClick={handleBack1}>
                <ArrowBackIcon />
              </IconButton>
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "bolder",
                  fontFamily: "'SF Pro Display', sans-serif",

                }}
              >
                Predict & Explain
              </Typography>
              <IconButton onClick={handleRefresh} title="Refresh ML Explainer">
                <RefreshIcon />
              </IconButton>
            </Grid>
            {/* middle Grid */}
            <Grid item display="flex" justifyContent="center" alignItems="center" sx={{mainTop: "30px", marginRight:"5em"}}>            
              <Typography
            sx={{
              fontSize: "1.5rem",
              fontWeight: "bolder",
              fontFamily: "'SF Pro Display', sans-serif",
              display: "flex",
              alignItems: "center",
              cursor: "pointer"
            }}
            // onClick={() => setOpenEdit(true)}
          >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src={`/img/${type}.png`} alt={type} />
                <span style={{ marginLeft: "5px" }}>{name}</span>
              </div>
          </Typography>
            {/* help button grid */}
            </Grid>
            <Grid item display="flex" justifyContent="center" alignItems="center" sx={{mainTop: "30px"}}>      
            <CustomTooltip
                open={tooltipId === 34 ? true : false}
                onOpen={handleOpen}
                onClose={handleClose}
                title={
                  <Box padding="10px" display="flex" flexDirection="column" gap="10px">
                    <Typography>Need some help? Click on the Guide button to make sense out of the graphs.</Typography>
                    <Box style={{ display: 'flex', justifyContent: "flex-end" }}>
                      {/* <Button variant="contained" startIcon={<ArrowBackIos />} onClick={() => setTooltipId(33)}>PREVIOUS</Button> */}
                      <Button variant="contained" onClick={() => dispatch({ type: "TOGGLE_MODE", payload: -1 })}>OKAY</Button>
                    </Box>
                  </Box>
                }
                placement="bottom-start"
                arrow
              >
              <Typography
            sx={{
              fontSize: "1.5rem",
              fontWeight: "bolder",
              fontFamily: "'SF Pro Display', sans-serif",
              display: "flex",
              alignItems: "center",
              cursor: "pointer"
            }}
            onClick={() => onClick()}
          >
              <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    textDecoration: "none",
                    borderRadius: "8px"
                  }}
                >
                  <HelpIcon fontSize="smaller" sx={{ color: "#ffffff", marginRight:"1px" }} />
                  GUIDE
                </Button>
              </div>
          </Typography>
          </CustomTooltip>    
            </Grid>
          </Grid>
          <Grid item xs={12}  
            sx={{
              width: '98%',
              height: '92%',
              position: 'relative'
            }}
          >
            {loading && (
              <Backdrop open={true}>
                <CircularProgress color="inherit" />
              </Backdrop>
            )}
            <iframe
            id="iframe-id"
            src="http://localhost:8050"
            key={refreshCount} // Use refreshCount as the key to force re-render
            width="100%"
            height="97%"
            onLoad={handleLoad}
            frameBorder="0"
          ></iframe>

          </Grid>
        </Grid>
      </Paper>
      {/* <EditDialog open={openEdit} setOpen={setOpenEdit} modelName={name} /> */}
      <LoadingDialog
        open={loadingOpen}
        setOpen={setLoadingOpen}
      />
    </Grid>
  );
};

export default Body;
