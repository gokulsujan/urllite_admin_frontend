import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/commons/NavbarComponent";
import { AuthContextProviderComponent } from "./components/auth/AuthContextProviderComponent";

function App() {

    return (
        <>
            <Router>
                <AuthContextProviderComponent>
                    <NavbarComponent />
                    {/* Snackbar */}
                    <Routes>
                        {/* <Route path="/" /> */}
                    </Routes>
                </AuthContextProviderComponent>
            </Router>
        </>
    )
}

export default App
