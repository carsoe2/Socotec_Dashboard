import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';

export default function AssignFilteredHardware(props) {
    const [addedItems, setAddedItems] = useState([]);
    const [totalCost, setTotalCost] = useState(0);

    const [hardware, setHardware] = useState([]);
    useEffect(() => {
        getHardware();
    }, []);



    function getHardware() {
        axios.get('http://localhost:3001/api/chd').then(function (response) {
            //console.log(response.data);
            setHardware(response.data);
        });
    }

    const handleAddItem = (hardware) => {
        // Check if the hardware is already added
        const existingHardware = addedItems.find((item) => item.hardwareId == hardware.hardwareId);

        if (existingHardware) {
            // If the license is already added, update the quantity
            setAddedItems((prevItems) =>
                prevItems.map((item) =>
                    item.hardwareId === hardware.hardwareId ? { ...item, quantity: item.quantity + 1 } : item
                )
            );
        } else {
            // If the license is not added, add it with quantity 1
            setAddedItems((prevItems) => [...prevItems, { ...hardware, quantity: 1 }]);
        }
    };

    const handleRemoveItem = (hardwareId) => {
        setAddedItems((prevItems) => prevItems.filter((item) => item.hardwareId !== hardwareId));
    };


    const filteredData = hardware.filter((el) => {
        var chd = el.name + el.manufacturer + el.model + el.serialNumber;
        if (props.input !== '') {
            return chd.toLowerCase().includes(props.input);
        }
    })

    return (
        <div style={{ margin: '20px' }}>
            <div style={{ height: 100, overflow: 'auto' }}>
                <ul className="filtered">
                    {filteredData.map((hardware) => (
                        <div key={hardware.hardwareId} style={{ display: 'flex', justifyContent: 'space-between', width: '100' }}>
                            <li>{hardware.name} {hardware.maunfacturer}{hardware.model}</li>
                            <button onClick={() => handleAddItem(hardware)}>Add</button>
                        </div>
                    ))}
                </ul>
            </div>
                <div>
                    <h2>Added Items:</h2>
                    <div style={{ height: 150, overflow: 'auto', background: '#fff', color: '#000', borderRadius: '5px' }}>
                        <ul>
                            {addedItems.map((addedHardware) => (
                                <div key={addedHardware.hardwareId} style={{ display: 'flex', justifyContent: 'space-between', width: '100' }}>
                                    <li>{addedHardware.name} {addedHardware.maunfacturer}{addedHardware.model}</li>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <button style={{ marginRight: '20px' }} onClick={() => handleRemoveItem(addedHardware.hardwareId)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

    );
}
