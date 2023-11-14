import { useEffect, useState } from "react";
import { Box, LinearProgress, Button, ButtonGroup } from "@mui/material";
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
import { styled } from '@mui/material/styles';
import { tooltipClasses } from '@mui/material/Tooltip';
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';


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

const images = [
  {
    id: 1,
    buttonName: 'Feature Importance',
    question1: 'What is it?',
    question2: 'How to use it?',
    question3: 'Use the Insights',
    answer1: "Objective: This 'Feature/Column Importance' graph is designed to show the average impact of each feature (or column) in the dataset on the model's prediction outcome.",
    answer2: "Interpreting SHAP Values: The length of each bar represents the mean absolute SHAP value, which is a way to quantify the strength and direction (positive or negative) of a column's effect on the prediction.",
    answer3: "Model Explanation: These insights can also be used to explain to stakeholders why the model makes certain predictions and what factors it considers most important.",
    title: 'Feature Importance: Identify which columns are most influential in the model’s prediction.',
    image: '/img/gif12.gif'
  },
  {
    id: 2,
    question1: 'What is it?',
    question2: 'How to use it?',
    question3: 'Use the Insights',
    answer1: "Metrics Overview: The table lists different performance metrics that are used to evaluate the quality of the model. Each metric provides a different insight into how well the model is performing.",
    answer11: "Predicted vs Actual: This graph visually assesses how well the model's predictions match the actual data. Each point represents an observation: the x-axis shows the true value, and the y-axis shows the predicted value.",
    answer13: "Confusion Matrix: A confusion matrix is a table that is often used to describe the performance of a classification model on a set of test data for which the true values are known. It allows you to visualize the performance of an algorithm",
    answer2: "Interpreting Metrics: Depending on the problem type (Regression/Classification), it is more favourable to have lower values on the Regression metrics as they indicate errors while it is more favourable to get higher values on the Classification metrics",
    answer22: "Interpreting Predicted vs Actual: Examine how closely the points follow the diagonal line, which represents perfect prediction. Points that are far from the line represent larger errors in prediction. A tighter cluster of points around the line indicates a model that predicts more accurately.",
    answer23: "Interpreting Confusion Matrix: The key takeaway is that higher numbers on the diagonal are good (more correct predictions), and lower numbers off the diagonal are better (fewer incorrect predictions). The metrics in the table quantify the model's performance and can guide you in making decisions to improve the model or to understand its limitations.",
    answer3: "Model Explanation: These insights can also be used to explain to stakeholders the accuracy of the models and display the overall quality of the model.",
    
    buttonName: 'Regression / Classification Stats',
    title: "Stats: Assess how well the model's predictions match the actual data.",
    image: '/img/gif11.gif'
  },
  {
    id: 3,
    question1: 'What is it?',
    question2: 'How to use it?',
    question3: 'Use the Insights',
    answer1: "Prediction: This section is where you select the individual data point (ID Column) you want to analyze. It's crucial for evaluating the model's predictions on a case-by-case basis.",
    answer11: "Contributions Plot: This section visualizes how much each column contributes to the prediction for the selected ID. Columns that push the prediction higher are shown in green, and those that lower it are in red. This plot is essential for understanding the 'why' behind the model's decision.",
    answer2: "Using Prediction: Choose an (ID Column) from the dataset using the dropdown menu or click Random to select an ID at random. The Observed: indicates the actual outcome, providing a real-world benchmark for the model's prediction.",
    answer22: "Using Contributions Plot: This tool allows you to dissect the prediction and see which columns had the most significant impact, positively or negatively.",
    answer3: "Model Explanation: This section demystifies the model's predictions by breaking them down into understandable parts. It allows for a granular look at the decision-making process, aiding in both trust-building and educational insights into how machine learning models work.",
    
    buttonName: 'Individual Predictions',
    title: "Individual Predictions: Evaluate the model's predictions on a case-by-case basis",
    image: '/img/gif13.gif'
  },
  {
    id: 4,
    question1: 'What is it?',
    question2: 'How to use it?',
    question3: 'Use the Insights',
    answer1: "Prediction: This section is where you select the individual data point (ID Column) you want to analyze. It's crucial for evaluating the model's predictions on a case-by-case basis.",
    answer11: "Feature Input: This section lets you adjust the values of the columns for the selected ID and see how these changes might affect the model's prediction. This can help you understand which columns are most influential and how sensitive the model is to changes in the input data.",
    answer2: "Interpreting Prediction: Choose an (ID Column) from the dataset using the dropdown menu or click Random to select an ID at random. The Observed: indicates the actual outcome, providing a real-world benchmark for the model's prediction.",
    answer22: "Interpreting Contributions Plot: Adjust the column values using the dropdown menus and input fields. As you adjust these values, the 'Prediction' section will update to reflect the new predicted outcome based on the changed inputs.This interactivity allows you to perform what-if analyses to explore hypothetical scenarios.",
    answer3: "Model Explanation: By adjusting input columns, you can simulate what-if scenarios to explore how changes in input data might affect outcomes. This can be a powerful way to understand the decision-making process of the model.",    
    buttonName: 'What if..',
    title: 'What if..: Simulate what-if scenarios to explore how changes in input data might affect outcomes.',
    image: '/img/gif14.gif'
  },
  {
    id: 5,
    question1: 'What is it?',
    question2: 'How to use it?',
    question3: 'Use the Insights',
    answer1: "Shap Summary: provides a summary of the model's decision-making process for a particular column. It combines elements of box plots and density plots to show the distribution of SHAP values. This helps in understanding the overall impact of the column on the model.",
    answer11: "Shap Dependence: allows you to understand the effect of a single column across the whole dataset. It shows how the model's output varies with changes in the column value. This is crucial for recognizing which columns are driving the model's predictions and how they're doing so.",
    answer2: "Using Shap Summary: Read the plot to see the distribution of the SHAP values for different categories within the selected column. The wider sections represent a higher density of data points, meaning that the SHAP value is more common in that range.",
    answer22: "Using Shap Dependence: Select the main column you're interested in from the 'Column:' dropdown. Observe the spread of data points to see how changes in the column value affect the SHAP value.",
    answer3: "Model Explanation: These insights can be used to explain to stakeholders which columns are driving the model's predictions and how each value is understood by the model",
    
    buttonName: 'Feature Dependence',
    title: "Feature Dependence: Learn which columns are driving the model's predictions and how.",
    image: '/img/giftest.gif'
  }
];

const LoadingDialog = ({ open, setOpen, response }) => {
  const navigate = useNavigate();

  const [progress, setProgress] = useState(0);
  const [selectedImage, setSelectedImage] = useState(images[0]);

  useEffect(() => {
    if (response) {      
      const isActive = response.finishing;
      console.log('Is Active:', isActive);
  
      // You can now use this variable in your component state or logic
    }
  }, [response]);

  useEffect(() => {
    if (open) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(timer);
          }

          return Math.min(oldProgress + 100 / 450, 100);
        });
      }, 100);

      return () => {
        clearInterval(timer);
      }
    }
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    setProgress(0);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
      <DialogContent
  sx={{
    display: "flex",
    flexDirection: "column",
    height:"800px",
    gap: "1em",
  }}
>
  <Box
    sx={{
      display: "flex",
      justifyContent: "center", // This will center the button group horizontally
      width: "100%", // This ensures the Box takes up the full width
    }}
  >
    <ButtonGroup
      variant="contained"
      aria-label="outlined primary button group"
    >
      {images.map((image, index) => (
        <Button
          key={image.id}
          onClick={() => setSelectedImage(image)}
          // Apply a different style if this is the selected image
          sx={{
            backgroundColor:
              selectedImage.id === image.id ? "#1741c2" : "#7e89a8",
            "&:hover": {
              backgroundColor:
                selectedImage.id === image.id ? "#1c3da3" : "#69718a",
              border: "none",
            },
            fontSize: "15px",
            fontFamily: "'SF Pro Display', sans-serif",
          }}
        >
          {/* Replace `Button ${index + 1}` with your custom button names */}
          {image.buttonName}
        </Button>
      ))}
    </ButtonGroup>
  </Box>

  <Box
    key={selectedImage.id}
    sx={{
      position: "relative",
      overflowY: "auto", // Enable vertical scrolling
      // maxHeight: "450px", // Set a maximum height for the scrollable area
    }}
  >
    <div style={{ display: "flex", justifyContent: "center" }}>
  <img
    src={selectedImage.image}
    alt={selectedImage.title}
    style={{ width: "55em", height: "auto" }}
  />
</div>
    <Box
      sx={{
        position: "absolute",
        top: "370px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        color: "white",
        padding: "5px",
        fontSize: "17px",
        fontFamily: "'SF Pro Display', sans-serif",
        borderRadius: "5px",
      }}
    >
      {selectedImage.title}
    </Box>
    <Typography
    sx={{
      fontFamily: "'SF Pro Display', sans-serif",
      marginLeft:"40px",
      marginTop:"10px",
      fontSize: "19px",
      fontFamily: "'SF Pro Display', sans-serif",
      fontWeight:"bold"
    }}>
    {selectedImage.question1}
    </Typography>
    <Typography
    sx={{
      fontFamily: "'SF Pro Display', sans-serif",
      marginLeft:"40px",
      marginTop:"10px",
      fontSize: "16px",
      fontFamily: "'SF Pro Display', sans-serif",
    }}>
    {selectedImage.answer1}
    </Typography>
    <Typography
    sx={{
      fontFamily: "'SF Pro Display', sans-serif",
      marginLeft:"40px",
      marginTop:"10px",
      fontSize: "16px",
      fontFamily: "'SF Pro Display', sans-serif",
    }}>
    {selectedImage.answer11}
    </Typography>
    <Typography
    sx={{
      fontFamily: "'SF Pro Display', sans-serif",
      marginLeft:"40px",
      marginTop:"10px",
      fontSize: "16px",
      fontFamily: "'SF Pro Display', sans-serif",
    }}>
    {selectedImage.answer13}
    </Typography>
    <Typography
    sx={{
      fontFamily: "'SF Pro Display', sans-serif",
      marginLeft:"40px",
      marginTop:"10px",
      fontSize: "19px",
      fontFamily: "'SF Pro Display', sans-serif",
      fontWeight:"bold"
    }}>
    {selectedImage.question2}
    </Typography>
    
    <Typography
    sx={{
      fontFamily: "'SF Pro Display', sans-serif",
      marginLeft:"40px",
      marginTop:"10px",
      fontSize: "16px",
      fontFamily: "'SF Pro Display', sans-serif",
    }}>
    {selectedImage.answer2}
    </Typography>
    <Typography
    sx={{
      fontFamily: "'SF Pro Display', sans-serif",
      marginLeft:"40px",
      marginTop:"10px",
      fontSize: "16px",
      fontFamily: "'SF Pro Display', sans-serif",
    }}>
    {selectedImage.answer22}
    </Typography>
    <Typography
    sx={{
      fontFamily: "'SF Pro Display', sans-serif",
      marginLeft:"40px",
      marginTop:"10px",
      fontSize: "16px",
      fontFamily: "'SF Pro Display', sans-serif",
    }}>
    {selectedImage.answer23}
    </Typography>
    <Typography
    sx={{
      fontFamily: "'SF Pro Display', sans-serif",
      marginLeft:"40px",
      marginTop:"10px",
      fontSize: "19px",
      fontFamily: "'SF Pro Display', sans-serif",
      fontWeight:"bold"
    }}>
    {selectedImage.question3}
    </Typography>
    <Typography
    sx={{
      fontFamily: "'SF Pro Display', sans-serif",
      marginLeft:"40px",
      marginTop:"10px",
      fontSize: "16px",
      fontFamily: "'SF Pro Display', sans-serif",
    }}>
    {selectedImage.answer3}
    </Typography>
  </Box>
</DialogContent>

      <DialogActions style={{ display: "flex", justifyContent: "flex-end" }}>

        <Button onClick={handleClose} sx={{ marginRight: "15px", marginBottom: "10px", fontFamily: "'SF Pro Display', sans-serif",
 }}>
          CLOSE
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoadingDialog;
