import { Box, Grid, Typography } from "@mui/material";
import "../../App.css";
import FaqItem from "./FaqItem";

const Faqs = () => {
  const itemList = [
    {
      question: "What is VisAutoML and who is it for?",
      answer: "VisAutoML is an advanced online machine learning platform designed specifically for non-experts. It offers a user-friendly UI/UX that automates data preprocessing, model training, and testing. This tool is ideal for anyone who wishes to leverage machine learning to extract insights from their data without needing to understand the complexities of ML algorithms or write any code."
    },
    {
      question: "How does VisAutoML simplify data preprocessing?",
      answer: "Our tool simplifies the data preprocessing step by automating it. With VisAutoML, you can prepare your data for analysis with just a few clicks. The platform handles tasks such as cleaning data, handling missing values, and encoding categorical data, making it easier for you to get your data ready for machine learning models."
    },
    {
      question: "Can I train and test machine learning models without coding expertise using VisAutoML?",
      answer: "Absolutely! VisAutoML automates the model training and testing processes, allowing you to build and evaluate machine learning models without writing a single line of code. The platform guides you through setting up your model with intuitive controls and workflows, making it accessible even if you're new to machine learning."
    },
    {
      question: "What are XAI visualizations and how does VisAutoML use them?",
      answer: "XAI visualizations refer to 'Explainable Artificial Intelligence' visualizations. These are tools and techniques used to make the decisions and operations of machine learning models more understandable to humans. VisAutoML generates XAI visualizations in a dashboard format, providing users with clear, understandable insights into how their models work and make decisions, thus ensuring transparency and building trust in the automated processes."
    }
  ]
  return (
    <Grid container id="FAQs" position="relative" display="flex" flexDirection="column" alignItems="center" minHeight="100vh" zIndex="0">
      <Box position="absolute" top="50vh" right="-135px" zIndex="-1">
        <img src="./img/land/Ellipse2.png" style={{ maxWidth: "270px", maxHeight: "270px" }} />
      </Box>
      <Typography
        width="100%"
        textAlign="center"
        style={{
          color: "#333333",
          fontSize: "65px",
          marginTop: "150px",
          fontFamily: "'SF Pro Display', sans-serif",
          fontWeight: 600,
        }}
      >
        FAQ's
      </Typography>
      { itemList.map(item => <FaqItem key={item.question} props={item} /> ) }
    </Grid>
  );
};

export default Faqs;