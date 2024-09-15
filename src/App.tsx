import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
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

function App() {
  return (
    <Context>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customer" element={<CustomerPage />} />
          <Route path="/my-team" element={<MyTeam />} />
          <Route path="/servicing" element={<Servicing />} />
          <Route path="/campaign" element={<Campaign />} />
          <Route path="/workbench" element={<Workbench />} />
          <Route path="/leads" element={<Leads />} />
        </Routes>
      </BrowserRouter>
    </Context>
  );
}

export default App;
