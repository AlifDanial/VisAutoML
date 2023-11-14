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

const RegressDialog = ({open, setOpen}) => {
    const [scroll, setScroll] = React.useState('paper');
    const url = "https://youtu.be/vPde9bYrr80";
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
          Regression
        </Typography>
        <Typography
        sx={{
          margin:"0.5em 0 0 0",
          fontSize: "1.0rem",
          fontWeight: "semi bold",
          fontFamily: "Open Sans",
        }}>
        A brief explanation on Regression in Machine Learning
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
        Regression:
        </Typography>
            Regression is a statistical technique that helps us understand the relationship between two or more variables. It's commonly used in fields like economics, psychology, and healthcare to make predictions and identify trends.
            <Typography
        sx={{
          margin:"0.5em 0 0 0",
          fontSize: "1.0rem",
          fontWeight: "bold",
          fontFamily: "Roboto",
        }}>
        Main Idea:
        </Typography>
            Imagine you want to predict someone's weight based on their height. You could use regression to find the best-fitting line that describes this relationship. This line represents the relationship between height and weight, and can be used to make predictions about someone's weight based on their height.
            <Typography
        sx={{
          margin:"0.5em 0 0 0",
          fontSize: "1.0rem",
          fontWeight: "bold",
          fontFamily: "Roboto",
        }}>
        Types of Regression:
        </Typography>
        There are different types of regression, including linear regression, polynomial regression, and logistic regression. Linear regression is used when there is a linear relationship between the variables, while polynomial regression is used when the relationship is curved. Logistic regression is used when the outcome is categorical.    
        <Typography
        sx={{
          margin:"0.5em 0 0 0",
          fontSize: "1.0rem",
          fontWeight: "bold",
          fontFamily: "Roboto",
        }}>
        Evaluation Metrics:
        </Typography>
        When using regression to make predictions, it's important to evaluate the performance of the model. There are several metrics that can be used to measure the accuracy of the model's predictions:
        Mean Squared Error (MSE): This measures the average squared difference between the predicted values and the actual values. A lower MSE indicates better performance.
        Root Mean Squared Error (RMSE): This is the square root of the MSE and is often used because it has the same unit as the target variable. A lower RMSE indicates better performance.
        R-squared (R2): This measures how well the model fits the data, with values between 0 and 1. An R2 of 1 means that the model perfectly fits the data, while an R2 of 0 means that the model doesn't fit the data at all.
        <Typography
        sx={{
          margin:"0.5em 0 0 0",
          fontSize: "1.0rem",
          fontWeight: "bold",
          fontFamily: "Roboto",
        }}>
        Limitations:
        </Typography>
        Despite its usefulness, regression has some limitations that should be considered. For example, it assumes a linear relationship between the variables, which may not always be the case in real-world situations. Additionally, regression cannot prove causation, meaning that even if two variables are correlated, it doesn't necessarily mean that one causes the other. Other factors may be at play that are not accounted for in the regression analysis.
        <Typography
        sx={{
          margin:"0.5em 0 0 0",
          fontSize: "1.0rem",
          fontWeight: "bold",
          fontFamily: "Roboto",
        }}>
        Conclusion:
        </Typography>
        Regression is a powerful statistical tool that can help us understand relationships between variables and make predictions about future outcomes. By fitting a line or curve to a set of data, we can identify trends and patterns that would be difficult to see otherwise. However, it's important to keep in mind the assumptions and limitations of regression and to use it in conjunction with other methods to gain a comprehensive understanding of a phenomenon. Overall, regression is a valuable addition to any data analysis toolkit.
            </DialogContentText>
        </DialogContent>
      <DialogActions>
          <Button onClick={handleClose}>Close</Button>         
        </DialogActions>
    </Dialog>
  );
};

export default RegressDialog;
