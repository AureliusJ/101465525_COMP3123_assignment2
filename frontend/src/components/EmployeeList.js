import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEmployees, deleteEmployee } from '../services/api';

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllEmployees();
    }, []);

    const fetchAllEmployees = async () => {
        try {
            const response = await fetchEmployees();
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
            alert('Error fetching employees');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await deleteEmployee(id);
                setEmployees(employees.filter((employee) => employee._id !== id));
                alert('Employee deleted successfully');
            } catch (error) {
                console.error('Error deleting employee:', error);
                alert('Error deleting employee');
            }
        }
    };

    return (
        <div className="container mt-4">
            {/* Add Employee Button */}
            <div className="mb-3 text-end">
                <button
                    className="btn btn-success"
                    onClick={() => navigate('/employees/add')}
                >
                    Add Employee
                </button>
                <button
                    className="btn btn-primary ms-3"
                    onClick={() => navigate('/search')}
                >
                    Search Employees
                </button>
            </div>

            {/* Employee List Table */}
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Department</th>
                        <th>Position</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length > 0 ? (
                        employees.map((employee) => (
                            <tr key={employee._id}>
                                <td>{employee._id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.department}</td>
                                <td>{employee.position}</td>
                                <td>
                                    {/* Action Buttons */}
                                    <div className="btn-group">
                                        <button
                                            className="btn btn-info btn-sm"
                                            onClick={() => navigate(`/employees/view/${employee._id}`)}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="btn btn-warning btn-sm"
                                            onClick={() => navigate(`/employees/edit/${employee._id}`)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(employee._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">
                                No employees found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;
