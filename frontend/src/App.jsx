import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import axios from "axios";

const baseURL = import.meta.env.VITE_REACT_APP_API_BASE_URL;
axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;

import Novels from "./pages/Novels";
import Novel from "./pages/Novel";
import Chapter from "./pages/Chapter";

import Rd from "./pages/Rd";
function App() {
  return (
    <Router>
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/" element={<Novels />} />
        <Route path="/novels/:novelId" element={<Novel />} />
        <Route
          path="/novels/:novelId/chapter/:chapterId"
          element={<Chapter />}
        />
        <Route path="/rd" element={<Rd />} />
      </Routes>
    </Router>
  );
}

export default App;
