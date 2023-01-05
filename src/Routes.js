import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Wrapper from 'layouts/Wrapper';

const PrivateRoute = lazy(() => import('PrivateRoute'));

const Login = lazy(() => import('features/auth/Login'));
const Dashboard = lazy(() => import('pages/Dashboard'));
const Posts = lazy(() => import('pages/Posts'));

const AllRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<h3>Loading...</h3>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="" element={<Wrapper />}>
              <Route path="" element={<Navigate to="/dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="posts" element={<Posts />} />
              <Route path="*" />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AllRoutes;
