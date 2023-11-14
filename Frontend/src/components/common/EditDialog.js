import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { BACKEND_BASE_URL } from "../../config/config.js";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { DialogContent, TextField, Typography } from "@mui/material";

const EditDialog = ({ modelName, open, setOpen }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const csrfToken = Cookies.get("csrftoken");
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "X-CSRFToken": csrfToken,
    },
  };

  useEffect(() => {
    setName(modelName)
  }, []);

  const handleRename = () => {
    dispatch({ type: 'RENAME_MODEL', payload: name });
    setOpen(false);
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontFamily: "Open Sans" }}>
        {"Rename your document"}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          // label="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          maxWidth="xs"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          sx={{ fontFamily: "Open Sans", borderRadius: "40px" }}
          onClick={handleRename}
        >
          Rename
        </Button>
        <Button
          sx={{ fontFamily: "Open Sans", borderRadius: "40px" }}
          variant="outlined"
          onClick={handleClose}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
