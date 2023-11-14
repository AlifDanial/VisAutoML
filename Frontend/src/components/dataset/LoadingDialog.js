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
    title: 'Image 1',
    image: '/img/image1.png'
  },
  {
    id: 2,
    title: 'Image 1',
    image: '/img/image1.png'
  }
];

const LoadingDialog = ({ open, setOpen }) => {
  const navigate = useNavigate();

  const [progress, setProgress] = useState(0);

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
        >
          {images.map(image => (
            <Box key={image.id}>
              <img src={image.image} alt={image.title} />
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
          <Typography sx={{ fontSize: "1.2em" }}>
            Training: About {parseInt(45 - 45 * progress / 100)} seconds remaining
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={handleClose} variant="outlined" sx={{ marginLeft: "15px", marginBottom: "10px" }}>
          Cancel
        </Button>
        <Button onClick={() => navigate('/model')} variant={progress === 100 ? "outlined" : "disabled"} sx={{ marginRight: "15px", marginBottom: "10px" }}>
          Explore Model
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoadingDialog;
