import MainLayout from "./layouts/MainLayout";
import PreviewIcon from "@mui/icons-material/Preview";
import { Routes, Route } from "react-router-dom";
import ViewRegistration from "./pages/ViewRegistration";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
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
            name: "Customer Requests",
            onClick: () => {
                navigate("/");
            },
            icon: <PreviewIcon sx={{ color: "white" }} />,
            path: "/",
            element: <ViewRegistration />,
        },
        {
            name: "Add User",
            onClick: () => {
                navigate("/add-user");
            },
            icon: <PersonAddAltIcon sx={{ color: "white" }} />,
            path: "/add-user",
            element: <AddUser />,
        },
    ];
    const loggedInSelected = loggedInList.findIndex(
        ({ path }) => path === location.pathname
    );
    console.log({ isaaaa: isAnyUserLoggedIn() });
    // location.pathname === "/" ? 0 : 1;
    return <div>Hello world</div>;
    isAnyUserLoggedIn() ? (
        <MainLayout
            selectedIndex={loggedInSelected}
            list={loggedInList}
            logout={true}
        >
            <Routes>
                {loggedInList.map(({ path, element }, index) => (
                    <Route path={path} element={element} key={index}></Route>
                ))}
            </Routes>
        </MainLayout>
    ) : (
        <Login />
    );
}

export default App;
