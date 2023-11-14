import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { BACKEND_BASE_URL } from "../../config/config.js";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

const DeleteDialog = ({ open, setOpen }) => {
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();
    const csrfToken = Cookies.get("csrftoken");
    const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "X-CSRFToken": csrfToken,
    },
    };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontFamily: "Open Sans" }}>
        {"Delete this model?"}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} sx={{ fontFamily: "Open Sans" }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleClose}
          color="error"
          sx={{ fontFamily: "Open Sans" }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
