import Auth from "../components/Auth";
import { useState } from "react";
import { axiosPost } from "../utils/config";
import { useNavigate } from "react-router";
const Login = () => {
    const navigate = useNavigate();
    const [userError, setUserError] = useState("");
    const [passError, setPassError] = useState("");
    const callApi = async (data) => {
        try {
            const tokens = await axiosPost("/login", data, false);
            if (!tokens) {
                console.log("something went wrong");
                return;
            }
            localStorage.setItem("accessToken", tokens.data.accessToken);
            localStorage.setItem("refreshToken", tokens.data.refreshToken);
            navigate("/");
            window.location.reload(false);
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
        <Auth
            type="login"
            error={{ username: userError, password: passError }}
            callApi={callApi}
        />
    );
};
export default Login;
