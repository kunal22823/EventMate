import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./Layout/Layout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Add from "./Pages/Add/Add";
import List from "./Pages/List/List";
import Students from "./Pages/Student/Student";
import EditEvent from "./Pages/EditEvent/EditEvent";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        <Route path="/add" element={<Layout><Add /></Layout>} />
        <Route path="/list" element={<Layout><List /></Layout>} />
        <Route path="/edit-event/:id" element={<EditEvent />} />
        <Route path="/student" element={<Layout><Students /></Layout>} />
      </Routes>
    </>
  );
};

export default App;
