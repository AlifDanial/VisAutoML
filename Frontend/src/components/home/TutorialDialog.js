import { Box, Link } from "@mui/material";
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
import DialogContentText from '@mui/material/DialogContentText';
import newModel from "../../static/images/newModel.png";
import ReactPlayer from "react-player";


const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#000000',
    color: '#ffffff',
    maxWidth: 580,
    fontSize: theme.typography.pxToRem(14),
    border: '1px solid #dadde9',
    borderRadius: '10px',
  },
}));

const TutorialDialog = ({ open, setOpen }) => {
  const [scroll, setScroll] = React.useState('paper');
  const url = "https://youtu.be/S_nz9__yPvE";
  const handleClose = () => {
    setOpen(false);
  };

  function handleClick() {
    window.open('https://drive.google.com/file/d/1mLXLnA1HrGjZis_9mxn5U-ASm4dT1LtT/view?usp=sharing', '_blank');
  }

  //   const handleSave = () => {
  //     const { isValid, validationErrors } = modelValidator({
  //       name: name,
  //       type: type,
  //     });
  //     if (isValid) {
  //       dispatch(addNewModel(name, type));
  //       setOpen(false);
  //       navigate("/dataset");
  //     } else {
  //       setErrors(validationErrors);
  //     }
  //   };


  return (
    <Dialog open={open} onClose={handleClose} scroll={scroll} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
        <Box>
          <Typography
            sx={{
              flex: 1,
              color: "#000000",
              fontFamily: "Open Sans",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            Tutorial Video
          </Typography>
          <Typography
            sx={{
              margin: "0.5em 0 0 0",
              fontSize: "1.0rem",
              fontWeight: "semi bold",
              fontFamily: "Open Sans",
            }}>
            A brief guide on this tool and AutoML in general
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent dividers={scroll === 'paper'}>
        <ReactPlayer url={url} controls width="850px" />
        <Button
          sx={{
            margin: "0.5em 0 0 0",
            fontSize: "1rem",
            fontWeight: "bold",
            fontFamily: "Roboto",
            alignItems: "right"
          }}
          onClick={() => handleClick()}>
          Sample Dataset download
        </Button>
        <DialogContentText>


          <Typography
            sx={{
              margin: "0.5em 0 0 0",
              fontSize: "1.0rem",
              fontWeight: "bold",
              fontFamily: "Roboto",
            }}>
            Machine Learning Pipeline:
          </Typography>
          Machine learning pipeline is a sequence of steps that machine learning practitioners use to prepare data, build and train models, and evaluate performance. The pipeline is usually composed of data preprocessing, feature engineering, model selection and training, and evaluation. The ultimate goal of the pipeline is to produce a model that accurately predicts target values for new data.
          <Typography
            sx={{
              margin: "0.5em 0 0 0",
              fontSize: "1.0rem",
              fontWeight: "bold",
              fontFamily: "Roboto",
            }}>
            Automated Machine Learning (AutoML):
          </Typography>
          Automated Machine Learning, or AutoML, is a process of automating the tasks involved in building and deploying machine learning models. AutoML tools automate tasks such as feature engineering, hyperparameter tuning, model selection, and model architecture search, reducing the amount of time and effort required to develop high-performing machine learning models.
          <Typography
            sx={{
              margin: "0.5em 0 0 0",
              fontSize: "1.0rem",
              fontWeight: "bold",
              fontFamily: "Roboto",
            }}>
            Advantages of AutoML:
          </Typography>
          AutoML tools offer several advantages to machine learning practitioners, including reducing the time and effort required to build and deploy models, improving the efficiency of the machine learning process, and democratizing machine learning by making it accessible to non-experts.
          <Typography
            sx={{
              margin: "0.5em 0 0 0",
              fontSize: "1.0rem",
              fontWeight: "bold",
              fontFamily: "Roboto",
            }}>
            Limitations of AutoML:
          </Typography>
          While AutoML offers several advantages, it also has some limitations. For instance, AutoML tools may not be suitable for all machine learning tasks, and they may produce models with lower accuracy than models built by expert data scientists. Additionally, AutoML tools may not be able to handle large datasets or complex machine learning problems.
          <Typography
            sx={{
              margin: "0.5em 0 0 0",
              fontSize: "1.0rem",
              fontWeight: "bold",
              fontFamily: "Roboto",
            }}>
            How AutoML works:
          </Typography>
          AutoML tools use advanced algorithms to automate the machine learning pipeline. The tools can automatically perform tasks such as data preprocessing, feature engineering, hyperparameter tuning, and model selection. Some AutoML tools also use machine learning to improve their performance over time.
          <Typography
            sx={{
              margin: "0.5em 0 0 0",
              fontSize: "1.0rem",
              fontWeight: "bold",
              fontFamily: "Roboto",
            }}>
            Applications of AutoML:
          </Typography>
          AutoML tools are used in a wide range of industries and applications, including finance, healthcare, and marketing. AutoML can be used for tasks such as fraud detection, risk assessment, customer segmentation, and image and speech recognition. As AutoML tools become more advanced, their applications are likely to expand further, making machine learning more accessible and useful to non-experts.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TutorialDialog;
