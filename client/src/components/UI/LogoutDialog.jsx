import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { logout } from "store/Auth/authSlice";

const LogoutDialog = ({ open, setOpen }) => {

  const dispatch = useDispatch();
  const handleClickOpen = () => {
    dispatch(logout());
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Logout Confirmation"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to logout of your account
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="error">Cancel</Button>
        <Button onClick={handleClickOpen} autoFocus variant="contained" color="success">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutDialog;
