import { useState,  useEffect } from "react";
import { getEmployees, saveEmployees } from "../utils/storage";

const EmployeeForm = ({ onEmployeeSaved, editData, clearEdit }) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [state, setState] = useState("");
  const [image, setImage] = useState("");
  const [isActive, setIsActive] = useState(true);

  // 🔹 Load data when editing
  useEffect(() => {
    if (editData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(editData.name);
      setGender(editData.gender);
      setDob(editData.dob);
      setState(editData.state);
      setImage(editData.image);
      setIsActive(editData.isActive);
    }
  }, [editData]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !gender || !dob || !state || !image) {
      alert("All fields are required");
      return;
    }

    let employees = getEmployees();

    if (editData) {
      employees = employees.map((emp) =>
        emp.id === editData.id
          ? { ...emp, name, gender, dob, state, image, isActive }
          : emp
      );
    } else {
      employees.push({
        id: Date.now(),
        name,
        gender,
        dob,
        state,
        image,
        isActive,
      });
    }

    saveEmployees(employees);
    onEmployeeSaved(employees);
 if (clearEdit) {
  clearEdit();
  }

    setName("");
    setGender("");
    setDob("");
    setState("");
    setImage("");
    setIsActive(true);
  };

  return (
    <div style={{ marginBottom: "30px" }}>
      <h3>{editData ? "Edit Employee" : "Add Employee"}</h3>



{/* <button onClick={() => window.print()}>Print</button> */}

     <div className="card">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br /><br />

        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <br /><br />

        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
        <br /><br />

        <select value={state} onChange={(e) => setState(e.target.value)}>
          <option value="">Select State</option>
          <option value="Odisha">Odisha</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Delhi">Delhi</option>
        </select>
        <br /><br />

        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <br /><br />

        {image && <img src={image} width="80" />}
        <br /><br />

        <label>
          <input
            type="checkbox"
            checked={isActive}
            onChange={() => setIsActive(!isActive)}
          />
          Active
        </label>
        <br /><br />

        <button type="submit">
          {editData ? "Update Employee" : "Add Employee"}
          
        </button>

        {editData && (
          <button type="button" onClick={clearEdit} style={{ marginLeft: "10px" }}>
            Cancel
          </button>
        )}
      </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
