import { Box, Grid, Typography } from "@mui/material";

import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

import "../../App.css";
import { useState } from "react";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  // border: `1px solid ${theme.palette.divider}`,
  borderRadius: "5px",
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <svg xmlns="http://www.w3.org/2000/svg" width="40.967" height="40.967" viewBox="0 0 40.967 40.967">
        <g id="Group_2" data-name="Group 2" transform="translate(-509.155 -215.219)">
          <line id="Line_19" data-name="Line 19" y2="40.967" transform="translate(529.639 215.219)" fill="none" stroke="#000" stroke-width="3" />
          <line id="Line_20" data-name="Line 20" y2="40.967" transform="translate(550.122 235.702) rotate(90)" fill="none" stroke="#000" stroke-width="3" />
        </g>
      </svg>
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded #Line_19': {
    stroke: "none"
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded #Line_20': {
    stroke: "#F00"
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  // padding: theme.spacing(2),
  // borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const Faqs = () => {

  const itemList = [
    {
      question: "What is VisAutoML, and how does it work?",
      answer: " wdw"
    },
    {
      question: "Can I use VisAutoML for classification or regression?",
      answer: "Absolutely! VisAutoML supports a wide range of machine learning tasks, including classification and regression. You can choose the type of problem you want to solve, and the tool will guide you through the process, ensuring that your models are tailored to your specific needs."
    },
    {
      question: "Is VisAutoML suitable for both beginners and experienced data scientists?",
      answer: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    },
    {
      question: "How does VisAutoML handle data preprocessing?",
      answer: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ]

  const [expanded, setExpanded] = useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Grid container id="FAQs" position="relative" minHeight="100vh" zIndex="0">
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
        }}
      >
        FAQs
      </Typography>
      {
        itemList.map((item, index) =>
          <Accordion expanded={expanded === 'panel'+index.toString()} onChange={handleChange('panel'+index.toString())}>
            <AccordionSummary aria-controls={`panel${index.toString()}d-content`} id={`panel${index.toString()}d-header`}>
              <Typography>{item.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {item.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        )
      }
    </Grid>
  );
};

export default Faqs;