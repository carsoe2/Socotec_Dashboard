import { DataGrid } from '@mui/x-data-grid';
import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, useTheme } from '@mui/material';
import { tokens } from "../../theme";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import EditPopUpLicense from "./EditPopUpLicense";

export default function ListLicenses(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const contentStyle = { background: `${colors.primary[500]}`, borderRadius: "5px" };
  const arrowStyle = { color: '#000' };

  const [licenses, setLicenses] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isPopupEditOpen, setIsPopupEditOpen] = useState(false);
  const [isPopupDeleteOpen, setIsPopupDeleteOpen] = useState(false);
  getLicenses();
  useEffect(() => {
    getLicenses();
  }, []);

  const openPopupEdit = () => {
    setIsPopupEditOpen(true);
  };

  const openPopupDelete = () => {
    setIsPopupDeleteOpen(true);
  };

  function getLicenses() {
    axios.get('http://localhost:3001/api/licenses').then(function (response) {
      //console.log(response.data);
      setLicenses(response.data);
      processData(response.data);
    });
  }
  const deleteLicense = (id) => {
    axios.delete(`http://localhost:3001/api/delete/license/${id}`).then(function (response) {
      //console.log(response.data);
      getLicenses();
      props.onChange();
    });
  }

  function formatDate(date) {
    var res = "";
    for (var i = 0; i < 10; i++) res += date[i];
    return res;
  }

  async function getActiveCount(licenseid) {
    try {
      const response = await axios.get(`http://localhost:3001/api/get/license/active/${licenseid}`);
      const count = parseInt(response.data[0]['count(*)']);
      return count; // Return the count value
    } catch (error) {
      //console.error('Error fetching active count:', error);
      throw error; // Rethrow the error to indicate failure
    }
  }

  async function getInactiveCount(licenseid) {
    try {
      const response = await axios.get(`http://localhost:3001/api/get/license/inactive/${licenseid}`);
      const count = parseInt(response.data[0]['count(*)']);
      return count; // Return the count value
    } catch (error) {
      //console.error('Error fetching active count:', error);
      throw error; // Rethrow the error to indicate failure
    }
  }

  const filteredData1 = licenses.filter((el) => {
    var license = el.vendor + el.product;
    if (props.input === '') {
      return licenses;
    } else {
      return license.toLowerCase().includes(props.input);
    }
  });

  async function processData() {
    const promises = filteredData1.map(async (el) => {
      const activeCount = await getActiveCount(el.licenseId);
      const inactiveCount = await getInactiveCount(el.licenseId);
      return {
        ...el,
        'activeCount': activeCount,
        'inactiveCount': inactiveCount
      };
    });

    try {
      const processedData = await Promise.all(promises);
      setFilteredData(processedData); // Update the state 
    } catch (error) {
      //console.error('Error processing data:', error);
      throw error
    }
  }

  const columns = [
    { field: 'licenseId', headerName: 'License Id' },
    {
      field: 'isActive',
      headerName: 'Status',
      
      valueGetter: (params) => (params.row.isActive === 1 ? 'Active' : 'Inactive'),
      renderCell: (params) => (
        <div style={{ backgroundColor: params.row.isActive === 1 ? 'green' : 'red', padding: '4px', borderRadius: '4px', textAlign: 'center' }}>
          {params.row.isActive === 1 ? "Active" : "Inactive"}
        </div>
      ),
    },
    {
      field: 'vendor',
      headerName: 'Vendor',
      
      //   editable: true,
    },
    {
      field: 'product',
      headerName: 'Product',
      
      //   editable: true,
    },
    {
      field: 'price',
      headerName: 'Price',
      
      //   editable: true,
    },
    {
      field: 'expirationData',
      headerName: 'Expiration Date',
      valueGetter: (params) =>
        (params.row.expirationData = formatDate(
          params.row.expirationData
        )),
      //   editable: true,
    },
    {
      field: 'activeCount',
      headerName: 'Active Count',
      
      //   editable: true,
    },
    {
      field: 'inactiveCount',
      headerName: 'Inactive Count',
      
      //   editable: true,
    },
    {
      field: "Edit",
      headerName: "Edit License",
      renderCell: (params) => {
        return (
          <Popup open={isPopupEditOpen} trigger={<Button color="secondary" onClick={() => openPopupEdit}>Edit</Button>} modal nested  {...{ contentStyle }}>
            {(close) => (
              <div className="modal">
                <div className="content">
                  <EditPopUpLicense licenseId={params.id} onSubmit={() => {close(); getLicenses();}}/>
                  <div style={{ display: 'flex', justifyContent: 'end', margin: "20px" }}><Button variant="outlined" color="error" onClick={() => close()}>Cancel</Button></div>
                </div>
              </div>
            )}
          </Popup>
        )
      }
    },
    {
      field: "Remove",
      headerName: "Delete License",
      renderCell: (params) => {
        return (
          <Popup open={isPopupDeleteOpen} trigger={<Button variant="outlined" color="error" onClick={() => openPopupDelete}>Delete</Button>} modal nested {...{ contentStyle }}>
            {(close) => (
              <div className='modal'>
                <div className='content'>
                <div style={{margin:"20px"}}>
                    <p>Do you want to permanently delete this license?</p>
                    <div style={{display:"flex", justifyContent:"space-between", width: "100"}}>
                    <Button variant="contained" color="success" onClick={() => { deleteLicense(params.id); }}>Yes</Button>
                    <Button variant="outlined" color="error" onClick={() => close()}>Cancel</Button>
                    </div>
                    </div>
                </div>
              </div>
            )}
          </Popup>
        )
      }
    },
  ];

  return (

    <div style={{ height: 400, width: '100' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            columns={columns}
            rows={filteredData}
            getRowId={(row) => row.licenseId}
            pageSize={15}
          />
        </div>
      </div>
    </div>
  )
}