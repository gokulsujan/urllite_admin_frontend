import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/commons/NavbarComponent";
import { AuthContextProviderComponent } from "./components/auth/AuthContextProviderComponent";
import LoginComponent from "./components/LoginComponent";
import { Box } from "@mui/material";
import { SnackbarComponent } from "./components/commons/SnackbarComponent";
import { DashboardComponent } from "./components/home/DashboardComponent";
import PrivateRoute from "./components/utils/PrivateRoute";
import { UserDashboardComponent } from "./components/users/UserDashboardComponent";

function App() {

    return (
        <>
            <Router>
                <AuthContextProviderComponent>
                    <NavbarComponent />
                    <SnackbarComponent >
                        <Box sx={{ mt: 12 }}>
                            <Routes>
                                <Route path="/signin" element={<LoginComponent />} />
                                <Route path="/" element={<PrivateRoute><DashboardComponent /></PrivateRoute>} />
                                <Route path="/user/:id" element={<PrivateRoute><UserDashboardComponent /></PrivateRoute>} />
                            </Routes>
                        </Box>
                    </SnackbarComponent>
                </AuthContextProviderComponent>
            </Router>
        </>
    )
}

export default App
