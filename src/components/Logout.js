import ListItem from "@mui/material/ListItem";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { axiosPost } from "../utils/config";
const Logout = () => {
    const callApi = async () => {
        await axiosPost(
            "/logout",
            { refreshToken: localStorage.getItem("refreshToken") },
            false
        );
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.reload(false);
    };
    return (
        <ListItem
            button
            onClick={callApi}
            selected={false}
            style={{
                alignSelf: "flex-end",
            }}
        >
            <ListItemIcon>
                <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"logout"} />
        </ListItem>
    );
};
export default Logout;
