import { BrowserRouter } from "react-router-dom";
import PageRouter from "./router";

export default function App() {
  return (
    <BrowserRouter>
      <PageRouter />
    </BrowserRouter>
  );
}
