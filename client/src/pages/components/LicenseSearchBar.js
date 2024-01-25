import { React, useState, useEffect } from "react";
import ListFilteredLicense from './ListFilteredLicense'
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Box } from "@mui/material";

const LicenseSearchBar = () => {

  const [inputText, setInputText] = useState("");
  const [activeCount, setActiveCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const navigate = useNavigate();

  function handleClick() {
      navigate('/createLicense');
  }


  useEffect(() => {
    getActiveCount();
    getTotalCount();
  }, []);

  function listChanged() {
    getActiveCount();
    getTotalCount();
  }

  function getActiveCount() {
    axios.get('http://localhost:3001/api/get/license/activeCount').then(function (response) {
      setActiveCount(response.data[0]["sum(filtered)"]);
    });
  }

  function getTotalCount() {
    axios.get('http://localhost:3001/api/get/license/totalCount').then(function (response) {
      setTotalCount(response.data[0]["sum(filtered)"]);
    });
  }

  let inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const activePercentage = (activeCount / totalCount) * 100;
  const activeBarWidth = Math.min(200, (activePercentage / 100) * 200);
  const remainingBarWidth = Math.min(200 - activeBarWidth, 200);


  return (

    <div className="main">
    <Box>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <h1>License Dashboard</h1>
    </div>
  </Box>
      <div style={{ height: 400, width: '100' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <div className="main">
              <div className="main" style={{ marginBottom: "0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignContent:"center"}}>
                  <div>
                    <span>{activeCount}/{totalCount} Active Licenses</span>
                    <div style={{display:"flex", marginBottom:"20px"}}>
                      <div
                        style={{
                          width: `${activeBarWidth}px`,
                          height: "20px",
                          backgroundColor: "green",
                          borderRadius: "5px 0px 0px 5px",
                        }}
                      />
                      <div
                        style={{
                          width: `${remainingBarWidth}px`,
                          height: "20px",
                          backgroundColor: "grey",
                          borderRadius: "0px 5px 5px 0px",

                        }}
                      />
                    </div>

                  
                </div>
                <div><Button variant="outlined" color="neutral" onClick={handleClick}>Create New License</Button></div>
              </div>
              </div>
              <div className="search">
                <TextField
                  id="outlined-basic"
                  onChange={inputHandler}
                  variant="outlined"
                  fullWidth
                  label="Search licenses"
                />
              </div>
              <br />
              <ListFilteredLicense input={inputText} onChange={listChanged}/>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default LicenseSearchBar;