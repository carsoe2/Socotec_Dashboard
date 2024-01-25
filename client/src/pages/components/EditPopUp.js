import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";

const EditPopUp = (props) => {
  const [employee, setEmployee] = useState(null);

  const getEmployee = (async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/get/employee/employeeid/${props.employeeId}`);
      setEmployee(response.data[0]);
      console.log(response.data[0])
    } catch (error) {
      throw error; // Rethrow the error to indicate failure
    }
  });

  useEffect(() => {
    getEmployee();
  }, [props.employeeId]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setEmployee((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(
        `http://localhost:3001/api/put/employee/employeeid/${props.employeeId}`,
        employee
      )
      .then((res) => {
        //console.log(res.data);
        props.onSubmit();
      });
  };

  return (

    <form onSubmit={handleSubmit}>
      {employee ? (
        <>
      <div style={{margin:"20px"}}>
      <h1>Edit Employee</h1>
        <div style={{display: "flex", marginBottom:"10px"}}>
          <div style={{width: "15%"}}><p style={{margin: "0"}}>First Name:</p></div>
          <div style={{width: "85%"}}><input style={{width: "100%"}}type="text" name="fName" defaultValue={employee.fName} onChange={handleChange} /></div>
        </div>
        <div style={{display: "flex", marginBottom:"10px"}}>
          <div style={{width: "15%"}}><p style={{margin: "0"}}>Last Name:</p></div>
          <div style={{width: "85%"}}><input style={{width: "100%"}} type="text" name="lName" defaultValue={employee.lName} onChange={handleChange} /></div>
        </div>
        <div style={{display: "flex", marginBottom:"10px"}}>
          <div style={{width: "15%"}}><p style={{margin: "0"}}>Email:</p></div>
          <div style={{width: "85%"}}><input style={{width: "100%"}}type="text" name="email" defaultValue={employee.email} onChange={handleChange} /></div>
        </div>
        <div style={{display: "flex", marginBottom:"10px"}}>
          <div style={{width: "15%"}}><p style={{margin: "0"}}>Division:</p></div>
          <div style={{width: "85%"}}><input style={{width: "100%"}}type="text" name="division" defaultValue={employee.division} onChange={handleChange} /></div>
        </div>
        <div style={{display: "flex", marginBottom:"10px"}}>
          <div style={{width: "15%"}}><p style={{margin: "0"}}>Company:</p></div>
          <div style={{width: "85%"}}><input style={{width: "100%"}}type="text" name="company" defaultValue={employee.company} onChange={handleChange} /></div>
        </div>
        <div style={{display: "flex", marginBottom:"10px"}}>
          <div style={{width: "15%"}}><p style={{margin: "0"}}>Profit Center:</p></div>
          <div style={{width: "85%"}}><input style={{width: "100%"}}type="text" name="profitCenter" defaultValue={employee.profitCenter} onChange={handleChange} /></div>
        </div>
        <div style={{display: "flex"}}>
          <div style={{width: "15%"}}><p style={{margin: "0"}}>Is Active:</p></div>
          <div style={{width: "85%"}}><input style={{width: "100%"}}type="text" name="isActive" defaultValue={employee.isActive ? "Yes" : "No"} onChange={handleChange} /></div>
        </div>
        </div>
        
          {/* <label>
            License ID:
            <input type="text" name="licenseId" defaultValue={employee.licenseId} onChange={handleChange} />
          </label> */}
          <Button variant="contained" color="success"style={{marginLeft:"20px"}}type="submit">Submit</Button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </form>

  );
};

export default EditPopUp;
