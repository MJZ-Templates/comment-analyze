import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
