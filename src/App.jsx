import React from "react";
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./app/Home";
import Login from "./app/Login";
import PrivateRoutes from "./assets/component/PrivateRoutes";
import Dashboard from "./app/Dashboard";
import NotFoundPage from "./app/Unauthorized";
import TenantList from "./app/TenantLists";
import AddTenant from "./app/AddTenant";
import TenantAppList from "./app/TenantAppLists";
import AddTenantApp from "./app/AddTenantApp";
import TenantCategoryLists from "./app/TenantCategoryLists";
import AddTenantCategory from "./app/AddTenantCategory";
import EditCategory from "./app/EditCategory";
import EditTenant from "./app/EditTenant";
import TenantApps from "./app/TenantApps";
import EditApp from "./app/EditApp";

function App() {

  return (
      <>
        <Router>
          <Routes>

            {/* Public Routes */}
            <Route path="/" element={<Login/>}/>
            <Route path="*" element={<NotFoundPage />} />

            {/* Protected Routes */}
            <Route element={<PrivateRoutes allowedRoles={["Admin", "Viewer"]} />}>
              <Route path="/app/home" element={<Home />} />
            </Route>
            <Route element={<PrivateRoutes allowedRoles={["Admin"]} />}>
              <Route path="/app/dashboard" element={<Dashboard />} />
            </Route>
            <Route element={<PrivateRoutes allowedRoles={["Admin"]} />}>
              <Route path="/app/tenantlists" element={<TenantList />} />
            </Route>
            <Route element={<PrivateRoutes allowedRoles={["Admin"]} />}>
              <Route path="/app/addtenant" element={<AddTenant />} />
            </Route>
            <Route element={<PrivateRoutes allowedRoles={["Admin"]} />}>
              <Route path="/app/tenantapplists" element={<TenantAppList />} />
            </Route>
            <Route element={<PrivateRoutes allowedRoles={["Admin"]} />}>
              <Route path="/app/addtenantapp" element={<AddTenantApp />} />
            </Route>
            <Route element={<PrivateRoutes allowedRoles={["Admin"]} />}>
              <Route path="/app/tenantcategorylists" element={<TenantCategoryLists />} />
            </Route>
            <Route element={<PrivateRoutes allowedRoles={["Admin"]} />}>
              <Route path="/app/addtenantcategory" element={<AddTenantCategory />} />
            </Route>
            <Route element={<PrivateRoutes allowedRoles={["Admin"]} />}>
              <Route path="/app/EditCategory/:id" element={<EditCategory />} />
            </Route>
            <Route element={<PrivateRoutes allowedRoles={["Admin"]} />}>
              <Route path="/app/edittenant/:id" element={<EditTenant />} />
            </Route>
            <Route element={<PrivateRoutes allowedRoles={["Admin"]} />}>
              <Route path="/app/tenantapplists/:tenantId" element={<TenantAppList />} />
            </Route>
            <Route element={<PrivateRoutes allowedRoles={["Admin"]} />}>
              <Route path="/app/tenantapps" element={<TenantApps />} />
            </Route>
            <Route element={<PrivateRoutes allowedRoles={["Admin"]} />}>
              <Route path="/app/editapp/:appId" element={<EditApp />} />
            </Route>
          </Routes>
        </Router>
      </>
  )
}

export default App
