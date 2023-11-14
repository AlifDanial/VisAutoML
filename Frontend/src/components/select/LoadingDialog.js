import { useEffect, useState } from "react";
import { Box, LinearProgress } from "@mui/material";
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
    title: 'Feature Importance: Identify which columns are most influential in the model’s prediction.',
    image: '/img/gif12.gif'
  },
  {
    id: 2,
    title: "Stats: Assess how well the model's predictions match the actual data.",
    image: '/img/gif11.gif'
  },
  {
    id: 3,
    title: "Individual Predictions: Evaluate the model's predictions on a case-by-case basis",
    image: '/img/gif13.gif'
  },
  {
    id: 4,
    title: 'What if..: Simulate what-if scenarios to explore how changes in input data might affect outcomes.',
    image: '/img/gif14.gif'
  },
  {
    id: 5,
    title: "Feature Dependence: Learn which columns are driving the model's predictions and how.",
    image: '/img/giftest.gif'
  }
];

const LoadingDialog = ({ open, setOpen, response }) => {
  const navigate = useNavigate();

  const [progress, setProgress] = useState(0);

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
          gap: "1em"
        }}
      >
        <Carousel
          autoPlay
          showThumbs={false}
          infiniteLoop
          interval={15000} // Set the interval to 10 seconds (10000 milliseconds)
          // stopOnHover // Pause auto-play on hover
          // stopOnInteraction={false} // Allow interaction without stopping auto-play
        >
          {images.map(image => (
            <Box key={image.id} style={{ position: 'relative' }}>
              <img src={image.image} alt={image.title} />
              <div
               style={{
                position: 'absolute',
                bottom: '30px', // Adjust the vertical position of the text
                left: '50%',    // Center the text horizontally
                transform: 'translateX(-50%)', // Center the text horizontally
                backgroundColor: 'rgba(0, 0, 0, 0.7)', // Background color for the text
                color: 'white', // Text color
                padding: '5px', // Padding around the text
                fontSize: '17px', // Font size of the text
                fontFamily: "'SF Pro Display', sans-serif",
                borderRadius:"5px"
              }}
              >
                {image.title}
              </div>
            </Box>
          ))}
        </Carousel>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            gap: "1em"
          }}
        >
          <LinearProgress variant="determinate" value={progress} style={{ height: 20, borderRadius: 10 }} />
          <Typography sx={{ fontSize: "1.2em", fontFamily: "'SF Pro Display', sans-serif", }}>
            {progress === 100 ? "Model Ready" : `Loading Model: About ${parseInt(45 - 45 * progress / 100)} seconds remaining`}
          </Typography>
        </Box>
        </DialogContent>
      <DialogActions style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={handleClose} variant="outlined" sx={{ marginLeft: "15px", marginBottom: "10px", fontFamily: "'SF Pro Display', sans-serif",
 }}>
          Cancel
        </Button>
        <Button onClick={() => navigate('/model')} variant={progress === 100 ? "outlined" : "disabled"} sx={{ marginRight: "15px", marginBottom: "10px", fontFamily: "'SF Pro Display', sans-serif",
 }}>
          Explore Model
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoadingDialog;
