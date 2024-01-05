import "./App.css";
import Footer from "./components/shared/Footer";
import Home from "./pages/Home";

function App() {
  return (
    <div className="flex flex-col min-h-screen backdrop-blur-lg bg-gradient-to-t from-slate-800 to-slate-900 px-4">
      <main>
        <Home />
      </main>
      <Footer />
    </div>
  );
}

export default App;
