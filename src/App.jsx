import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/commons/NavbarComponent";

function App() {

    return (
        <>
            <Router>
                <NavbarComponent />
                {/* Snackbar */}

                <Routes>
                    {/* <Route path="/" /> */}
                </Routes>
            </Router>
        </>
    )
}

export default App
