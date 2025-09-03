import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import AddTodo from "./pages/AddTodo";
import AllTodos from "./pages/AllTodos";
import LogRocket from "logrocket";
import userflow from "userflow.js";
import { useUsername } from "./hooks/useUsername";
import { useEffect } from "react";

LogRocket.init(import.meta.env.VITE_LOGROCKET_APP_ID, {
  mergeIframes: true,
});
window.LogRocket = LogRocket;

userflow.init(import.meta.env.VITE_USERFLOW_ENV_ID);

function App() {
  const { username } = useUsername();
  useEffect(() => {
    userflow.identify(username);
  }, [username]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation username={username} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddTodo />} />
            <Route path="/all" element={<AllTodos />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
