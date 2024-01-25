import { Box } from '@mui/material';
import Header from './components/Header';
import { useState } from "react";
import ChdSearchBar from './components/ChdSearchBar';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';

const ChdDashboard = () => {
    // const [content, setContent] = useState(<ChdSearchBar/>);
    const navigate = useNavigate();

    function handleClick() {
        navigate('/createHardware');
    }

    // function handleClick1() {
    //     setContent(<ChdSearchBar/>)
    // }


    return (
        <div>
            <Box m="20px">
                <h1>Hardware Dashboard</h1>
                <div style={{display:"flex", justifyContent:"end", marginBottom:"20px"}}><Button variant="outlined" color="neutral" onClick={handleClick}>Create New Device</Button></div>
                <ChdSearchBar/>
                {/* <button onClick={handleClick}>Create Device</button>
                <button onClick={handleClick1}>List Devices</button>
                {content} */}
            </Box>
        </div>
    );
}

export default ChdDashboard;