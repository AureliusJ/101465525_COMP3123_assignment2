import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';
import ViewEmployee from './components/ViewEmployee';
import SearchEmployee from './components/SearchEmployee';
import Header from './components/Header';

function App() {
    return (
        <Router>
            <Header />
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/employees" element={<EmployeeList />} />
                    <Route path="/employees/add" element={<AddEmployee />} />
                    <Route path="/employees/edit/:id" element={<EditEmployee />} />
                    <Route path="/employees/view/:id" element={<ViewEmployee />} />
                    <Route path="/search" element={<SearchEmployee />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
