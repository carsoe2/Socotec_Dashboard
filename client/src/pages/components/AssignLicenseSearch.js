import { React, useState } from "react";
import AssignLicenseFilter from "./AssignLicenseFilter";
import TextField from "@mui/material/TextField";


const AssignLicenseSearch = () => {

    const [inputText, setInputText] = useState("");

    let inputHandler = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    }

    return (
      <div className="main">
        <h1 style={{margin: "20px"}}>Assign Licenses</h1>
        <div className="search" style={{margin: "20px"}}>
          <TextField
            id="outlined-basic"
            onChange={inputHandler}
            variant="filled"
            fullWidth
            label="Search licenses"
          />
        </div>
        <AssignLicenseFilter input={inputText} />
      </div>

    );
};

export default AssignLicenseSearch