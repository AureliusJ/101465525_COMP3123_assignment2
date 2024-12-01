import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addEmployee } from '../services/api';

function AddEmployee() {
    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        email: '',
        department: '',
        position: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addEmployee(employee);
            alert('Employee added successfully');
            navigate('/employees');
        } catch (error) {
            alert('Error adding employee');
        }
    };

    return (
        <div className="container mt-4">
            <div className="card mx-auto" style={{ maxWidth: '600px' }}>
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">Add Employee</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                name="firstName"
                                value={employee.firstName}
                                onChange={handleChange}
                                placeholder="First Name"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                name="lastName"
                                value={employee.lastName}
                                onChange={handleChange}
                                placeholder="Last Name"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={employee.email}
                                onChange={handleChange}
                                placeholder="Email Address"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="department" className="form-label">Department</label>
                            <input
                                type="text"
                                className="form-control"
                                id="department"
                                name="department"
                                value={employee.department}
                                onChange={handleChange}
                                placeholder="Department"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="position" className="form-label">Position</label>
                            <input
                                type="text"
                                className="form-control"
                                id="position"
                                name="position"
                                value={employee.position}
                                onChange={handleChange}
                                placeholder="Position"
                            />
                        </div>
                        <div className="d-flex justify-content-between">
                            <button type="submit" className="btn btn-success w-45">Save</button>
                            <button
                                type="button"
                                className="btn btn-danger w-45"
                                onClick={() => navigate('/employees')}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddEmployee;
