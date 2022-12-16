import { Route, Routes } from "react-router-dom";

import JoinPage from "../pages/Join";
import LoginPage from "../pages/Login";
import MainPage from "../pages/Main";

export default function PageRouter() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/join" element={<JoinPage />} />
      <Route path="/main" element={<MainPage />} />
    </Routes>
  );
}
