import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Container from "./components/container/container";
import "./App.css";
import Dashboard from './dashboard.js';
import Home from "./pages/homed3js/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  Reports  from "./pages/reports/Reports";
// dnndndnv
function App() {
  return (
    <Router>
      <Topbar />
      <Container />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/reports" element={<Reports />}/>
          {/* <Route path="/product/:productId" element={<Product />} />
          <Route path="/newproduct" element={<NewProduct />} /> */}
        </Routes>
        <Dashboard />
      </div>
    </Router>
    
  );
}



export default App;
