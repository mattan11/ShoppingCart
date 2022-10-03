import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Store from './pages/Store';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/Navbar';
import { ShoppingCartProvider } from './context/ShoppingCartContext';

function App() {
    return (
        <ShoppingCartProvider>
            <Navbar></Navbar>
            <Container className="mb-4">
                <Routes>
                    <Route path="/ShoppingCart" element={<Home />} />
                    <Route path="/ShoppingCar/store" element={<Store />} />
                    <Route path="/ShoppingCar/about" element={<About />} />
                </Routes>
            </Container>
        </ShoppingCartProvider>
    );
}

export default App;
