import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";

const BackDialog = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirm = () => {
    setTimeout(() => {
      setOpen(false);
      navigate("/review");
    }, 500);
  };
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontFamily: "Open Sans" }}>
        {"There are unsaved changes, do you wish to discard them?"}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} sx={{ fontFamily: "Open Sans" }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleConfirm}
          color="error"
          sx={{ fontFamily: "Open Sans" }}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BackDialog;
