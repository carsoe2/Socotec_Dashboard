import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Box } from '@mui/material';
import LicenseCalculator from './components/LicenseCalculator';
import HardwareCalculator from './components/HardwareCalculator';
import Header from './components/Header';
import { useEffect, useState } from "react";


const HardwarePurchasing = () => {
    // const [content, setContent] = useState(<LicenseCalculator/>);

    // function handleClick() {
    //     setContent(<LicenseCalculator/>)
    // }

    // function handleClick1() {
    //     setContent(<HardwareCalculator/>)
    // }


    return (
        <div>
            <div style={{margin:"60px 80px 80px 80px", borderColor:"white", borderRadius:"10px", border:"solid", padding:"20px"}}>
                <HardwareCalculator />
                {/* <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Header title="Calculator Tools" subtitle="License and Hardware Calculators" />
                </Box> */}
                {/* <button onClick={handleClick}>License Calculator</button>
                <button onClick={handleClick1}>Hardware Calculator</button> */}
                {/* {content} */}

            </div>

 
        </div>
    );
}

export default HardwarePurchasing;
