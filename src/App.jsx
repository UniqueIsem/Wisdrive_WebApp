import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/HomePage";
import Login from "./pages/LoginPage";
import { Signin } from "./components/auth/Signin";
import { Signup } from "./components/auth/Signup";

import NotFound from "./pages/NotFound";
import { Tables } from "./components/screens/Tables";
import { Tables_Modules } from "./components/screens/Tables_Modules";
import { Modules_Quizzes } from "./components/screens/Modules_Quizzes";
import { Quizzes_Questions } from "./components/screens/Quizzes_Questions";
import { Questions_Answers } from "./components/screens/Questions_Answers";
import { Create_Quizz } from "./components/screens/Create_Quizz";
import { Edit_Question } from "./components/screens/Edit_Question";
import { Videos_Management } from "./components/screens/Videos_Management";
import { New_Link } from "./components/screens/New_Link";

import { GeneratorTest } from "./components/screens/GeneratorTest";
import { Upload_Generated } from "./components/screens/Upload_Generated";

import { TaskContextProvider } from "./context/TaskContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <TaskContextProvider>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/restfull" element={<Restfull />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/tables_modules/:id" element={<Tables_Modules />} />
            <Route path="/modules_quizzes/:id" element={<Modules_Quizzes />} />
            <Route
              path="/quizzes_questions/:id"
              element={<Quizzes_Questions />}
            />
            <Route
              path="/questions_answers/:id"
              element={<Questions_Answers />}
            />
            <Route path="/create_quizz" element={<Create_Quizz />} />
            <Route
              path="/edit_question/:questionId"
              element={<Edit_Question />}
            />
            <Route path="/videos_management" element={<Videos_Management />} />
            <Route path="/new_link" element={<New_Link />} />

            <Route path="/generator-test" element={<GeneratorTest />} />
            <Route
              path="/generator-test/quiz-preview"
              element={<Upload_Generated />}
            />
          </Route>

          <Route path="/login" element={<Login />}>
            <Route path="/login/signin" element={<Signin />} />
            <Route path="/login/signup" element={<Signup />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TaskContextProvider>
    </AuthProvider>
  );
}

export default App;
