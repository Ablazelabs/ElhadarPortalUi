import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();
const Auth = ({ type, error, callApi }) => {
    error = error || {};
    callApi =
        callApi ||
        function (data) {
            console.log(data);
        };
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = () => {
        if (username && password)
            callApi({
                username,
                password,
                type,
            });
    };
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {type === "login" ? "Sign in" : "Add User"}
                    </Typography>
                    <Box onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            value={username}
                            onChange={({ target }) => {
                                setUsername(target.value);
                            }}
                            autoSave="false"
                            inputProps={{ required: true }}
                        />
                        <span style={{ color: "red", marginLeft: "2ch" }}>
                            {error["username"]}
                        </span>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            value={password}
                            onChange={({ target }) => {
                                setPassword(target.value);
                            }}
                            label="Password"
                            inputProps={
                                type === "register"
                                    ? {
                                          autoComplete: "new-password",
                                          form: { autoComplete: "off" },
                                          required: true,
                                      }
                                    : { required: true }
                            }
                            type="password"
                        />
                        <span style={{ color: "red", marginLeft: "2ch" }}>
                            {error["password"]}
                            <br />
                        </span>
                        {type === "login" && (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="remember"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                        )}
                        <Button
                            onClick={handleSubmit}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {type === "login" ? "Sign in" : "Add User"}
                        </Button>
                        {/* <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid> */}
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};
export default Auth;
