import { Routes, Route, useNavigate } from "react-router-dom";
import Home from './pages/HomePage'
import Login from './pages/LoginPage';
import { Signin } from "./components/auth/Signin";
import { Signup } from "./components/auth/Signup";
import NotFound from './pages/NotFound';
import { QuizGenerator } from "./components/screens/QuizGenerator";
import { Restfull } from "./components/screens/Restfull";
import { Tables } from "./components/screens/Tables";
import { TaskContextProvider } from "./context/TaskContext";
import { AuthProvider } from "./context/AuthContext";

function App() {

  return (
    <AuthProvider>
      <TaskContextProvider>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/quiz-generator" element={<QuizGenerator />} />
            <Route path="/restfull" element={<Restfull />} />
            <Route path="/tables" element={<Tables />} />
          </Route>
          <Route path="/login" element={<Login />}>
            <Route path="/login/signin" element={<Signin />} />
            <Route path="/login/signup" element={<Signup />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TaskContextProvider>
    </AuthProvider>
  )
}

export default App