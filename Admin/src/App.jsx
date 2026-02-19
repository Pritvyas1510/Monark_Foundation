import React from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./Page/Auth/Login";
import Home from "./Page/Home/Home";
import AdminNavbar from "./components/Navbar";

import Events from "./Page/Events/Events";
import EventHome from "./Page/Events/EventHome";
import EventUpdate from "./Page/Events/EventUpdate";

import ImpactStory from "./Page/Impact/ImpactStory";
import CreateImpactStory from "./Page/Impact/CreateImpactStory";

import Story from "./Page/Story/Story";
import CreateStory from "./Page/Story/CreateStory";
import UpdatedStory from "./Page/Story/UpdatedStory";

import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";

const App = () => {
  const { token } = useSelector((state) => state.auth);

  return (
    <div>
      <Toaster position="bottom-right" />

      {token && <AdminNavbar />}

      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/home" element={<Home />} />

        {/* ADMIN ONLY */}

        <Route
          path="/event"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Events />
            </ProtectedRoute>
          }
        />

        <Route
          path="/eventhome"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <EventHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/eventupdate/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <EventUpdate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/impactstory"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ImpactStory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/createimpactstory"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <CreateImpactStory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/story"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Story />
            </ProtectedRoute>
          }
        />

        <Route
          path="/createstory"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <CreateStory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/updatedstory/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <UpdatedStory />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
export default App;
