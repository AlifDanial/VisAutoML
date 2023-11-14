import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import { Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { modelValidator } from "../validation/newModelValidation";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { addNewModel } from "../../actions/modelAction";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import InfoIcon from "@mui/icons-material/Info";
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { tooltipClasses } from '@mui/material/Tooltip';
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { withStyles } from "@mui/styles";


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

const NewModelDialog = ({ open, setOpen, name, type, setName, setType, tooltipId, setTooltipId }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setName(e.target.value);
  };
  const handleSelectChange = (e) => {
    setType(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const { isValid, validationErrors } = modelValidator({
      name: name,
      type: type,
    });
    if (isValid) {
      dispatch(addNewModel(name, type));
      setOpen(false);
      navigate("/dataset");
    } else {
      setErrors(validationErrors);
    }
  };

  const handleTooltipOpen = () => { };
  const handleTooltipClose = () => { };

  const regressionDefinition =
    "Predict continuous variables such as house prices, and weather temperatures (Ex- What is the temperature going to be tomorrow?)";
  const classificationDefinition =
    "Predict the categorization of data into different classes (Ex- Will it be hot or cold or tomorrow?)";

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
        <Box>
          <Typography
            sx={{
              flex: 1,
              color: "#000000",
              fontFamily: "'SF Pro Display', sans-serif",

              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            New Model
          </Typography>
          <Typography
            sx={{
              margin: "0.5em 0 0 0",
              fontSize: "1.0rem",
              fontWeight: "semi bold",
              fontFamily: "'SF Pro Display', sans-serif",

            }}
          >
            Create a machine learning model based on the learning task (Regression / Classification)
          </Typography>
        </Box>

        {/* <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton> */}
      </DialogTitle>

      <DialogContent>
        <CustomTooltip
          open={tooltipId === 6 ? true : false}
          onOpen={handleTooltipOpen}
          onClose={handleTooltipClose}
          title={
            <Box padding="10px" display="flex" flexDirection="column" gap="10px">
              <Typography>Give a name for you machine learning model - it can be
                changed anytime during the development process.</Typography>
              <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="contained" startIcon={<ArrowBackIos />} onClick={() => setTooltipId(5)}>PREVIOUS</Button>
                <Button variant="contained" endIcon={<ArrowForwardIos />} onClick={() => setTooltipId(7)}>NEXT</Button>
              </Box>
            </Box>
          }
          placement="top"
          arrow
        >
          <Box>
            <Typography
              sx={{
                margin: "1.5em 0 0 0",
                fontSize: "1.1rem",
                fontWeight: "semi bold",
                fontFamily: "'SF Pro Display', sans-serif",

              }}
            >
              Model Name
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              // label="Project Name"
              value={name}
              onChange={handleChange}
              type="text"
              maxWidth="xs"
              fullWidth
              variant="standard"
              error={errors && errors.name ? true : false}
              helperText={errors && errors.name}
            />
          </Box>
        </CustomTooltip>

        <Box sx={{ display: 'flex' }}>
          <Typography
            sx={{
              margin: "1.5em 0 0 0",
              fontSize: "1.1rem",
              fontWeight: "semi bold",
              fontFamily: "'SF Pro Display', sans-serif",

            }}
          >
            Learning Task
          </Typography>
          <HtmlTooltip placement="right"
            title={
              <React.Fragment>
                <Typography color="inherit" sx={{ fontWeight: "bold", fontFamily: "'SF Pro Display', sans-serif", fontSize: "1rem", }} >What's the difference?</Typography> <br />
                <u><b>{'Regression:'}</b></u><em>{" Predicts continuous data such as weather temperature"}</em><br /><em>{"(Ex- What is the temperature going to be tomorrow?)"}</em>
                <br /> <br />
                <u><b>{'Classification:'}</b></u><em>{" Predicts categorization of data into different classes "}</em><br /><em>{"(Ex- Will it be hot or cold or tomorrow?)"}</em>
                <br /><br />
              </React.Fragment>
            }
          >
            <InfoIcon fontSize="small" sx={{ margin: "1.3em 0 0 .2em", color: "grey" }} />
          </HtmlTooltip>
        </Box>

        <ToggleButtonGroup
          color="primary"
          value={type}
          exclusive
          onChange={handleSelectChange}
          aria-label="Platform"
          fullWidth
          error={errors && errors.type ? true : false}
          helperText={errors && errors.type}
          sx={{
            margin: "0.9em 0 0 0",
          }}
        >
          <CustomTooltip
            open={tooltipId === 7 ? true : false}
            onOpen={handleTooltipOpen}
            onClose={handleTooltipClose}
            title={
              <Box padding="10px" display="flex" flexDirection="column" gap="10px">
                <Typography>If you intend to predict numerical values like temperatures
                  and prices, it is a regression learning task.</Typography>
                <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button variant="contained" startIcon={<ArrowBackIos />} onClick={() => setTooltipId(6)}>PREVIOUS</Button>
                  <Button variant="contained" endIcon={<ArrowForwardIos />} onClick={() => setTooltipId(8)}>NEXT</Button>
                </Box>
              </Box>
            }
            placement="bottom-end"
            arrow
          >
            <ToggleButton
              value={"Regression"}
              sx={
                type === 'Regression' ? {
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  fontFamily: "Open Sans",
                  color: "#1976d2",
                  backgroundColor: "rgba(25, 118, 210, 0.08)"
                } : {
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  fontFamily: "'SF Pro Display', sans-serif",

                }}>
              Regression
            </ToggleButton>
          </CustomTooltip>

          <CustomTooltip
            open={tooltipId === 8 ? true : false}
            onOpen={handleTooltipOpen}
            onClose={handleTooltipClose}
            title={
              <Box padding="10px" display="flex" flexDirection="column" gap="10px">
                <Typography>If you intend to predict categorical values like spam or not
                  spam, it is a classification learning task.</Typography>
                <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button variant="contained" startIcon={<ArrowBackIos />} onClick={() => setTooltipId(7)}>PREVIOUS</Button>
                  <Button variant="contained" endIcon={<ArrowForwardIos />} onClick={() => setTooltipId(9)}>NEXT</Button>
                </Box>
              </Box>
            }
            placement="bottom-start"
            arrow
          >
            <ToggleButton
              value={"Classification"}
              sx={
                type === 'Classification' ? {
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  fontFamily: "Open Sans",
                  color: "#1976d2",
                  backgroundColor: "rgba(25, 118, 210, 0.08)"
                } : {
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  fontFamily: "'SF Pro Display', sans-serif",

                }}>
              Classification
            </ToggleButton>
          </CustomTooltip>
        </ToggleButtonGroup>


      </DialogContent>
      <DialogActions>
        <CustomTooltip
          open={tooltipId === 9 ? true : false}
          onOpen={handleTooltipOpen}
          onClose={handleTooltipClose}
          title={
            <Box padding="10px" display="flex" flexDirection="column" gap="10px">
              <Typography>Once you are done, click on Create to begin the next step.</Typography>
              <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="contained" startIcon={<ArrowBackIos />} onClick={() => setTooltipId(8)}>PREVIOUS</Button>
                <Button variant="contained" endIcon={<ArrowForwardIos />} onClick={() => setTooltipId(10)}>OKAY</Button>
              </Box>
            </Box>
          }
          placement="left"
          arrow
        >
          <Button onClick={handleSave} variant="contained" sx={{ marginRight: "15px", marginBottom: "10px", fontFamily: "'SF Pro Display', sans-serif", }}>
            Create
          </Button>
        </CustomTooltip>
      </DialogActions>
    </Dialog>
  );
};

export default NewModelDialog;
