import React, { useState } from 'react';
import { fetchEmployees } from '../services/api';

function SearchEmployee() {
    const [filters, setFilters] = useState({ department: '', position: '' });
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const query = new URLSearchParams(filters).toString();
            console.log('Search Query:', query); // Debugging query string
            const response = await fetchEmployees(`/search?${query}`);
            console.log('Search Response:', response.data); // Debugging response data
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching employees:', error);
            alert('Error searching employees');
        }
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value }); // Update filters state
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Search Employees</h2>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="mb-4">
                <div className="row">
                    <div className="col">
                        <input
                            type="text"
                            name="department"
                            className="form-control"
                            placeholder="Search by Department"
                            value={filters.department}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            name="position"
                            className="form-control"
                            placeholder="Search by Position"
                            value={filters.position}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col">
                        <button type="submit" className="btn btn-primary">
                            Search
                        </button>
                    </div>
                </div>
            </form>

            {/* Search Results Table */}
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Department</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>
                    {searchResults.length > 0 ? (
                        searchResults.map((employee) => (
                            <tr key={employee._id}>
                                <td>{employee._id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.department}</td>
                                <td>{employee.position}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">
                                No employees found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default SearchEmployee;
