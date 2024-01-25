import { React, useState } from "react";
import FilteredLicense from "./FilteredLicense";
import TextField from "@mui/material/TextField";


const LicenseSearchBar = () => {

    const [inputText, setInputText] = useState("");

    let inputHandler = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    }

    return (

      <div className="main">
        <div className="search">
          <TextField
            id="outlined-basic"
            onChange={inputHandler}
            variant="outlined"
            label="Search licenses"
          />
        </div>
        <FilteredLicense input={inputText} />
      </div>

    );
}

export default LicenseSearchBar