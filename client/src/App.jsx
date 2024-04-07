import { Box, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, isAuthSelector } from "./redux/slices/auth.js"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LicenseTable from "./Components/LicenseTable.jsx";
import LoginForm from "./Components/LoginForm.jsx";
import AddButton  from "./Components/Modals/AddButton.jsx";
function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector(isAuthSelector)
  useEffect(() => {
    dispatch(fetchAuthMe())
   }, []);
  return (
    <Router>
      <Box mx={100} px={6} pt={30} fontSize="sm">
        <Heading mb={10} pt={10} textAlign={"center"}>
          Контроль сроков
        </Heading>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/license" element={<LicenseTable />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
