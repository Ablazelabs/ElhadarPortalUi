import MainLayout from "./layouts/MainLayout";
import PreviewIcon from "@mui/icons-material/Preview";
import { Routes, Route } from "react-router-dom";
import ViewRegistration from "./components/ViewRegistration";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LoginIcon from "@mui/icons-material/Login";
import AddUser from "./pages/AddUser";
import Login from "./pages/Login";
import { useNavigate, useLocation } from "react-router";
function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const isAnyUserLoggedIn = () => {
        const accessToken = localStorage.getItem("accessToken");
        return Boolean(accessToken);
    };
    const loggedInList = [
        {
            name: "View Data",
            onClick: () => {
                navigate("/");
            },
            icon: <PreviewIcon />,
            path: "/",
            element: <ViewRegistration />,
        },
        {
            name: "Add User",
            onClick: () => {
                navigate("/add-user");
            },
            icon: <PersonAddAltIcon />,
            path: "/add-user",
            element: <AddUser />,
        },
    ];
    const nonLoggedInList = [
        {
            name: "Login",
            onClick: () => {
                console.log("main");
            },
            icon: <LoginIcon />,
        },
    ];
    const nonLoggedInSelected = 0;
    const loggedInSelected = loggedInList.findIndex(
        ({ path }) => path === location.pathname
    );
    // location.pathname === "/" ? 0 : 1;
    return (
        <MainLayout
            selectedIndex={
                isAnyUserLoggedIn() ? loggedInSelected : nonLoggedInSelected
            }
            list={isAnyUserLoggedIn() ? loggedInList : nonLoggedInList}
            logout={isAnyUserLoggedIn()}
        >
            <Routes>
                {isAnyUserLoggedIn() ? (
                    <>
                        {loggedInList.map(({ path, element }, index) => (
                            <Route
                                path={path}
                                element={element}
                                key={index}
                            ></Route>
                        ))}
                    </>
                ) : (
                    <Route path="/*" element={<Login />}></Route>
                )}
            </Routes>
        </MainLayout>
    );
}

export default App;
