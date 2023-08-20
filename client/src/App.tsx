import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Project/Navbar";
import Footer from "./components/shared/Footer";
import Home from "./pages/Home";
import Project from "./components/Project/Project";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Projects from "./pages/Projects";

function App() {
  return (
    <div className="flex flex-col min-h-screen backdrop-blur-lg bg-gradient-to-t from-slate-800  to-slate-900">
      <main className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<Project />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
