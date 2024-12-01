import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEmployeeById, updateEmployee } from '../services/api';

function EditEmployee() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        email: '',
        department: '',
        position: '',
    });

    useEffect(() => {
        const getEmployeeDetails = async () => {
            try {
                const response = await fetchEmployeeById(id);
                setEmployee(response.data);
            } catch (error) {
                alert('Error fetching employee details');
                navigate('/employees');
            }
        };
        getEmployeeDetails();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateEmployee(id, employee);
            alert('Employee updated successfully');
            navigate('/employees');
        } catch (error) {
            alert('Error updating employee');
        }
    };

    return (
        <div className="container mt-4">
            <div className="card mx-auto" style={{ maxWidth: '600px' }}>
                <div className="card-body">
                    <h3 className="card-title text-center">Update Employee</h3>
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

export default EditEmployee;
