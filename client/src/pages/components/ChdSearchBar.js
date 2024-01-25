import { React, useState } from "react";
import ListFilteredChd from './ListFilteredChd'
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button } from '@mui/material';

const ChdSearchBar = () => {

  const [inputText, setInputText] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  function handleClick() {
    navigate('/createHardware');
  }

  let inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <div className="main">
      <div style={{ height: 400, width: '100' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <div className="main">
              <div className="search">
                <TextField
                  id="outlined-basic"
                  onChange={inputHandler}
                  variant="outlined"
                  fullWidth
                  label="Search"
                />
              </div>
              <br />
              <ListFilteredChd input={inputText} />
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default ChdSearchBar;