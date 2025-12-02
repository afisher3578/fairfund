import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './sections/01-header/Header';
import Main from './sections/02-main/Main';
import Footer from './sections/03-footer/Footer';
import ProjectSupport from './pages/ProjectSupport';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="container">
              <Header />
              <Main />
              <Footer />
            </div>
          }
        />
        <Route path="/project/:projectId" element={<ProjectSupport />} />
      </Routes>
    </Router>
  );
}

export default App;
