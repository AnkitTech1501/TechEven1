import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component
import ShowPostEvent from './components/ShowPostEvent';
import ShowCreativeEvent from './components/ShowCreativeEvent';
import ShowPmCreativeEvent from './components/ShowPmCreative';
import ShowEstimateEvent from './components/ShowEstimateEvent';
import ShowPmEstimateEvent from './components/ShowPmEstimateEvent';
import NextEstimateEvent from './components/NextEstimateEvent';
import ViewEstimates from './components/ViewEstimates';
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
                <Route path="/dashboard/showpostevent/:eventId" element={<ProtectedRoute element={ShowPostEvent} />} />
                <Route path="/dashboard/showcreativeevent/:eventId" element={<ProtectedRoute element={ShowCreativeEvent} />} />
                <Route path="/dashboard/showpmcreative/:eventId" element={<ProtectedRoute element={ShowPmCreativeEvent} />} />
                <Route path="/dashboard/showestimates/:eventId" element={<ProtectedRoute element={ShowPmEstimateEvent} />} />
                <Route path="/dashboard/showestimateseevent/:eventId" element={<ProtectedRoute element={ShowEstimateEvent} />} />
                <Route path="/dashboard/nextestimatesevent/:eventId" element={<ProtectedRoute element={NextEstimateEvent} />} />
                <Route path="/dashboard/editestimatesevent/:eventId" element={<ProtectedRoute element={NextEstimateEvent} />} />
                <Route path="/dashboard/showestimates/:eventId/viewestimates/:estimateId" element={<ProtectedRoute element={ViewEstimates} />} />
            </Routes>
        </Router>
    );
};

export default App;
