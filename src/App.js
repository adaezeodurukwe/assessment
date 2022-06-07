import './App.css';
import MainContextProvider from './contexts/MainContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <MainContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MainContextProvider>
    </BrowserRouter>
  );
}

export default App;
