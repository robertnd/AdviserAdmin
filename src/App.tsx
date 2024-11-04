import { HashRouter, Routes, Route } from "react-router-dom";
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
import { Departments } from "./pages/departments";
import { Products } from "./pages/products";
import { Branches } from "./pages/branches";
import { ManageDepartment } from "./pages/departments/manage";
import { ManageBranch } from "./pages/branches/manage";
import { ManageProduct } from "./pages/products/manage";
//import { Notifications } from "./pages/notifications";
import { Intermediaries } from "./pages/intermediaries";
import { ManageIntermediary } from "./pages/intermediaries/manage";
import { Events } from "./pages/events";
import SetPassword from "./pages/auth/set-password";



function App() {
  const { token, setToken } = useToken();

  return (
    <Context>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login setToken={setToken} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/set-password/:code" element={<SetPassword />} />
          <Route path="/dashboard" element={<Protected isSignedIn={!!token}><Dashboard /></Protected>} />
          <Route path="/admins" element={<Protected isSignedIn={!!token}><Admins /></Protected>} />
          <Route path="/customer" element={<Protected isSignedIn={!!token}><CustomerPage /></Protected>} />
          <Route path="/my-team" element={<Protected isSignedIn={!!token}><MyTeam /></Protected>} />
          <Route path="/servicing" element={<Protected isSignedIn={!!token}><Servicing /></Protected>} />
          <Route path="/campaign" element={<Protected isSignedIn={!!token}><Campaign /></Protected>} />
          <Route path="/workbench" element={<Protected isSignedIn={!!token}><Workbench /></Protected>} />
          <Route path="/leads" element={<Protected isSignedIn={!!token}><Leads /></Protected>} />
          {/* <Route path="/departments" element={<Protected isSignedIn={!!token}><Departments /></Protected>} /> */}
          {/* <Route path="/departments/:departmentId" element={<Protected isSignedIn={!!token}><ManageDepartment /></Protected>} /> */}
          <Route path="/products" element={<Protected isSignedIn={!!token}><Products /></Protected>} />
          <Route path="/products/:productId" element={<Protected isSignedIn={!!token}><ManageProduct /></Protected>} />
          {/* <Route path="/branches" element={<Protected isSignedIn={!!token}><Branches /></Protected>} /> */}
          {/* <Route path="/branches/:branchId" element={<Protected isSignedIn={!!token}><ManageBranch /></Protected>} /> */}
          {/* <Route path="/notifications" element={<Protected isSignedIn={!!token}><Notifications /></Protected>} /> */}
          <Route path="/intermediaries" element={<Protected isSignedIn={!!token}><Intermediaries /></Protected>} />
          <Route path="/intermediaries/:intermediaryId" element={<Protected isSignedIn={!!token}><ManageIntermediary /></Protected>} />
          <Route path="/events" element={<Protected isSignedIn={!!token}><Events /></Protected>} />
        </Routes>
      </HashRouter>
      <ToastContainer stacked/>
    </Context>
  );
}

export default App;
