import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Comments from "./pages/Comments";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import FeaturePage from "./components/FeaturePage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ResetPassword from "./pages/ResetPassword";
import Users from "./pages/Users";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="comments" element={<Comments />} />
        <Route path="/:section" element={<FeaturePage />} />{" "}
        <Route path="/users" element={<Users />} />
        {/* Rota dinâmica para as seções */}
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
