import { Routes, Route, useNavigate } from "react-router-dom";
import { supabase } from "./supabase/client";
import { useEffect } from "react";
//import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import { TaskContextProvider } from "./context/TaskContext";
import Navbar from "./components/Navbar";
//import { AuthProvider } from "./context/AuthContext";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      //if (!session) {
        navigate("/"); //login
      /*} else {
        navigate("/");
      }*/
    });
  }, [navigate]);

  return (
    <TaskContextProvider>
      {/*<Navbar/>*/}
      <div className="container">
        <Routes>
          {/*<Route path="/" element={<Home />} />*/}
          <Route path="/" element={<Login />} /> {/*login*/}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </TaskContextProvider>

  )
}

export default App