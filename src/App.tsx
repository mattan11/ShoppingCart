import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Store from "./pages/Store";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
    return (
        <Container>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/store" element={<Store />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Container>
    );
}

export default App;
