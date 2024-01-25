import { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import Sidebar from "./pages/components/Sidebar"
import Topbar from "./pages/components/Topbar";
import './index.css';
import UserDash from "./pages/UserDashboard";
import LicenseDash from "./pages/LicenseDashboard";
import Calendar from './pages/Calendar';
import ChdDashboard from "./pages/ChdDashboard";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import CreateUser from './pages/components/CreateUser';
import CreateLicense from "./pages/components/CreateLicense";
import Calculators from "./pages/CalculatorTools";
import CreateHardware from "./pages/components/CreateHardware";
//import EditUser from './pages/components/EditUser';
//import Header from './pages/components/Header';
import HardwarePurchasing from "./pages/HardwarePurchasing";


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <div>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="*" element={<UserDash />} />
                <Route path="/licenses" element={<LicenseDash />} />
                <Route path="/devices" element={<ChdDashboard />} />
                <Route path="/createUser" element={<CreateUser />} />
                <Route path="/createLicense" element={<CreateLicense />} />
                <Route path="/createHardware" element={<CreateHardware />} />
                <Route path="/licensepurchasing" element={<Calculators />} />
                <Route path="/hardwarepurchasing" element={<HardwarePurchasing />} />
                <Route path="/calendar" element={<Calendar />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
      
      {/* <Routes>
        <Route index element={<ListUser />} />
        <Route path="user/create" element={<CreateUser />} />
        <Route path="user/:id/edit" element={<EditUser />} />
      </Routes> */}
    </div>
  );
}

export default App;
