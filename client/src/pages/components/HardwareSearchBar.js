import { React, useState } from "react";
import FilteredHardware from "./FilteredHardware";
import TextField from "@mui/material/TextField";


const HardwareSearchBar = () => {

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
            fullWidth
            label="Search hardware"
          />
        </div>
        <FilteredHardware input={inputText} />
      </div>
        
    );
}

export default HardwareSearchBar