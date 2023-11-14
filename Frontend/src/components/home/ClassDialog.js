import { Box} from "@mui/material";
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

const ClassDialog = ({open, setOpen}) => {
    const [scroll, setScroll] = React.useState('paper');
    const url = "https://youtu.be/8TuRJg76sW8";
  const handleClose = () => {
    setOpen(false);
  };

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
          Classification
        </Typography>
        <Typography
        sx={{
          margin:"0.5em 0 0 0",
          fontSize: "1.0rem",
          fontWeight: "semi bold",
          fontFamily: "Open Sans",
        }}>
        A brief explanation on Classification in Machine Learning
        </Typography>
        </Box>                
      </DialogTitle>
          
        <DialogContent dividers={scroll === 'paper'}>
            <DialogContentText>
            <ReactPlayer url={url} controls width="850px"/>
            <Typography
        sx={{
          margin:"0.5em 0 0 0",
          fontSize: "1.0rem",
          fontWeight: "bold",
          fontFamily: "Roboto",
        }}>
        Classification:
        </Typography>
        Classification is a type of machine learning that involves predicting which category an input belongs to. It's used in a wide range of applications, from email spam filtering to medical diagnosis.
            <Typography
        sx={{
          margin:"0.5em 0 0 0",
          fontSize: "1.0rem",
          fontWeight: "bold",
          fontFamily: "Roboto",
        }}>
        Main Idea:
        </Typography>
        Classification works by training a model on a dataset of labeled examples. The model learns to recognize patterns in the data that are associated with specific categories. Once trained, the model can be used to predict the category of new, unlabeled examples.
            <Typography
        sx={{
          margin:"0.5em 0 0 0",
          fontSize: "1.0rem",
          fontWeight: "bold",
          fontFamily: "Roboto",
        }}>
        Types of Classification:
        </Typography>
        There are different types of classification algorithms, including decision trees, k-nearest neighbors, and support vector machines. Each algorithm has its own strengths and weaknesses, and the choice of algorithm depends on the specific task and data at hand.
        <Typography
        sx={{
          margin:"0.5em 0 0 0",
          fontSize: "1.0rem",
          fontWeight: "bold",
          fontFamily: "Roboto",
        }}>
        Evaluation Metrics:
        </Typography>
        To evaluate the performance of a classification model, various metrics are used, such as accuracy, precision, recall, and F1 score. These metrics measure how well the model is able to correctly predict the category of inputs.
        <Typography
        sx={{
          margin:"0.5em 0 0 0",
          fontSize: "1.0rem",
          fontWeight: "bold",
          fontFamily: "Roboto",
        }}>
        Limitations:
        </Typography>
        Like any machine learning algorithm, classification has its limitations. For example, if the dataset is imbalanced (i.e., there are many more examples of one category than the other), the model may be biased towards the majority class. Additionally, if the model is trained on a specific type of data, it may not generalize well to new data that is different in some way.
        <Typography
        sx={{
          margin:"0.5em 0 0 0",
          fontSize: "1.0rem",
          fontWeight: "bold",
          fontFamily: "Roboto",
        }}>
        Conclusion:
        </Typography>
        Classification is a powerful tool in machine learning that can be used to make predictions about the category of new inputs. By training a model on labeled data and evaluating its performance, we can create accurate and reliable classifiers. However, it's important to keep in mind the limitations of classification and to carefully select and evaluate the algorithm and data to ensure the best results.
            </DialogContentText>
        </DialogContent>
      <DialogActions>
          <Button onClick={handleClose}>Close</Button>         
        </DialogActions>
    </Dialog>
  );
};

export default ClassDialog;
