import Auth from "../components/Auth";
import { useState } from "react";
import { axiosPost } from "../utils/config";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
const AddUser = () => {
    const [userError, setUserError] = useState("");
    const [passError, setPassError] = useState("");
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("asdf");
    const handleClose = () => {
        setOpen(false);
    };
    const callApi = async (data) => {
        try {
            const posted = await axiosPost("/add-user", data, true);
            if (!posted) {
                console.log("something went wrong");
                return;
            }
            setUserError("");
            setPassError("");
            setMessage(
                posted.data.success ? (
                    <>
                        <DoneIcon /> User successfully created
                    </>
                ) : (
                    <>
                        <CancelIcon /> Something went wrong
                    </>
                )
            );
            setOpen(true);
        } catch ({ error }) {
            setUserError("");
            setPassError("");
            if (error.username) {
                setUserError(error.username);
            }
            if (error.password) {
                setPassError(error.password);
            }
        }
    };
    return (
        <>
            <Auth
                type="register"
                error={{ username: userError, password: passError }}
                callApi={callApi}
            />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{message}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
export default AddUser;
