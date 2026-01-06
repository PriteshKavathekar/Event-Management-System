import React from "react";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeeComponent from "./components/EmployeeComponent";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div>
          <HeaderComponent />
          <div>
            <Routes>
              {/* localhost:3000 */}
              <Route path="/" element={<ListEmployeeComponent />}></Route>
              {/* localhost:3000/employees */}
              <Route path="/employees" element={<ListEmployeeComponent />}></Route>
              {/* localhost:3000/add-employee */}
              <Route path="/add-employee"element={<EmployeeComponent />}></Route>
              {/* localhost:3000/edit-employee/1 */}
              <Route path="/edit-employee/:id" element={<EmployeeComponent />}></Route>
            </Routes>
          </div>
          <FooterComponent />
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
