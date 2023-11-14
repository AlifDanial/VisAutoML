import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ReactPlayer from "react-player";

const VideoDialog = ({ open, setOpen, title, url }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{ display: "flex", alignItems: "center", padding: ".5em .5em" }}
      >
        <Typography sx={{ flex: 1, color: "#000000", fontWeight: "bold" }}>
          {title}
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ margin: "0", padding: "0" }}>
        <ReactPlayer url={url} controls width="600px" />
      </DialogContent>
    </Dialog>
  );
};

export default VideoDialog;
