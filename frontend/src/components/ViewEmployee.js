import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEmployeeById } from '../services/api';

function ViewEmployee() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({});

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

    return (
        <div className="container mt-4">
            <div className="card mx-auto" style={{ maxWidth: '600px' }}>
                <div className="card-body">
                    <h3 className="card-title text-center">Employee Details</h3>
                    <table className="table table-bordered mt-3">
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <td>{`${employee.firstName} ${employee.lastName}`}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{employee.email}</td>
                            </tr>
                            <tr>
                                <th>Department</th>
                                <td>{employee.department}</td>
                            </tr>
                            <tr>
                                <th>Position</th>
                                <td>{employee.position}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="text-center mt-3">
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate('/employees')}
                        >
                            Back to Employees
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewEmployee;
