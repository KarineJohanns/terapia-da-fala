import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Respiracao3126 from "./pages/respiracao/Respiracao3126.tsx";
import MenuPrincipal from "./components/Menu.tsx";
import Pratracra from "./pages/silabacao/pratracra.tsx";
import Bradragra from "./pages/silabacao/bradragra.tsx";


const App: React.FC = () => {
    return (
        <Router>
            <MenuPrincipal />
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Respiracao3126" element={<Respiracao3126 />} />
                    <Route path="/Pratracra" element={<Pratracra />} />
                    <Route path="/Bradragra" element={<Bradragra />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
