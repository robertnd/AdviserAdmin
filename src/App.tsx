import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import { Dashboard } from "./pages/dashboard";
import Context from "./context/AppContext";
import { CustomerPage } from "./pages/customer";
import { Workbench } from "./pages/workbench";
import { Campaign } from "./pages/campaign";
import { Servicing } from "./pages/servicing";
import { MyTeam } from "./pages/my-team";
import { Leads } from "./pages/leads";
import useToken from "./hooks/use-token";
import Protected from "./components/protected-element";
import { Admins } from "./pages/admins";

function App() {
  const { token, setToken } = useToken();

  return (
    <Context>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setToken={setToken} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Protected isSignedIn={!!token}><Dashboard /></Protected>} />
          <Route path="/admins" element={<Protected isSignedIn={!!token}><Admins /></Protected>} />
          <Route path="/customer" element={<Protected isSignedIn={!!token}><CustomerPage /></Protected>} />
          <Route path="/my-team" element={<Protected isSignedIn={!!token}><MyTeam /></Protected>} />
          <Route path="/servicing" element={<Protected isSignedIn={!!token}><Servicing /></Protected>} />
          <Route path="/campaign" element={<Protected isSignedIn={!!token}><Campaign /></Protected>} />
          <Route path="/workbench" element={<Protected isSignedIn={!!token}><Workbench /></Protected>} />
          <Route path="/leads" element={<Protected isSignedIn={!!token}><Leads /></Protected>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer stacked/>
    </Context>
  );
}

export default App;
