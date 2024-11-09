import 'antd/dist/reset.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from "./pages/home"
import { SavedPage } from "./pages/saved"
import { MandatPage } from './pages/mandat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="saved" element={<SavedPage />} />
        <Route path="mandat/:id" element={<MandatPage />} />
      </Routes>
    </Router>
  );
}

export default App;
