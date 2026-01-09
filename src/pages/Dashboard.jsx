import { useState } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, logoutUser } from "../utils/auth";
import { getEmployees, saveEmployees } from "../utils/storage";
import EmployeeForm from "../components/EmployeeForm";



const Dashboard = () => {
 
  const [employees, setEmployees] = useState(() => getEmployees());
  const [editEmployee, setEditEmployee] = useState(null);
    const [search, setSearch] = useState("");
    const [genderFilter, setGenderFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

  // useEffect(() => {
    
  //   setEmployees(getEmployees());
  // }, []);

   if (!isAuthenticated()) return <Navigate to="/" />;

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    const updated = employees.filter((emp) => emp.id !== id);
    saveEmployees(updated);
    setEmployees(updated);
  };

  const handleLogout = () => {
    logoutUser();
    window.location.href = "/";
  };

  const filteredEmployees = employees.filter((emp) => {
  const matchesName = emp.name.toLowerCase().includes(search.toLowerCase());
  const matchesGender = genderFilter ? emp.gender === genderFilter : true;
  const matchesStatus =
    statusFilter === ""
      ? true
      : statusFilter === "active"
      ? emp.isActive
      : !emp.isActive;

  return matchesName && matchesGender && matchesStatus;
});


  return (
    <div className="container">
      <h2>Employee Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>

      <EmployeeForm
        editData={editEmployee}
        clearEdit={() => setEditEmployee(null)}
        onEmployeeSaved={setEmployees}
      />
     
     <div className="filters">
     <input
  placeholder="Search by name"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

<select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
  <option value="">All Genders</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
</select>

<select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
  <option value="">All Status</option>
  <option value="active">Active</option>
  <option value="inactive">Inactive</option>
</select>

<button onClick={() => window.print()}>Print</button>

</div>


    <div className="summary">
      <h3>Total Employees: {employees.length}</h3>

      {employees.length === 0 ? (
        <p>No employees found</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Gender</th>
              <th>DOB</th>
              <th>State</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td><img src={emp.image} width="40" /></td>
                <td>{emp.name}</td>
                <td>{emp.gender}</td>
                <td>{emp.dob}</td>
                <td>{emp.state}</td>
                <td>{emp.isActive ? "Active" : "Inactive"}</td>
                <td>
                  <button onClick={() => setEditEmployee(emp)}>Edit</button>
                  <button onClick={() => handleDelete(emp.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      )}
      </div>
    </div>
  );
};

export default Dashboard;
