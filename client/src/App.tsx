import "./App.css";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/shared/Footer";
import Home from "./pages/Home";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Projects from "./pages/Projects";
import { AuthProvider } from "./context/authContext";
import { HomeProvider } from "./context/homeContext";
import ProtectedRoute from "./components/shared/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen backdrop-blur-lg bg-gradient-to-t from-slate-800  to-slate-900">
        <HomeProvider>
          <main className="">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/projects" element={<Projects />} />
                {/* <Route path="/projects/:id" element={<Project />} /> */}
              </Route>
            </Routes>
          </main>
        </HomeProvider>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
