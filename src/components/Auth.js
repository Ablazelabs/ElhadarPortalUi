import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Logo from "../components/Logo";

const theme = createTheme();
const Auth = ({ type, error, callApi }) => {
    error = error || {};
    callApi =
        callApi ||
        function (data) {
            console.log(data);
        };
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        callApi({
            username: data.get("username"),
            password: data.get("password"),
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
                    <Logo />
                    <Typography component="h1" variant="h5">
                        {type === "login" ? "Sign in" : "Add User"}
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            id="username"
                            name="username"
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
                            name="password"
                            id="password"
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {type === "login" ? "Sign in" : "Add User"}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};
export default Auth;
