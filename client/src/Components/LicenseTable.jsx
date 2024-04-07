import { useState, useEffect } from "react";
import { Box, Button, ButtonGroup, Flex, Skeleton } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import EditButtons from "./Modals/EditButtons.jsx";
import AddButton from "./Modals/AddButton.jsx";
import axios from "../axios.js";
import moment from "moment";
import { Navigate } from "react-router-dom";
import { isAuthSelector } from "../redux/slices/auth";
import { useSelector } from "react-redux";
const LicenseTable = () => {
  const [license, setLicense] = useState([]);
  const isAuth = useSelector(isAuthSelector);

  useEffect(() => {
    // get license data from server
    fetchLicenses();
  }, []);
  const fetchLicenses = async () => {
    const res = await axios.get("/api/license");

    setLicense(res.data.license);
  };

  return (
    <Box>
      {isAuth ? (
        <>
          <AddButton />
          <TableContainer overflow="hidden" whiteSpace="normal">
            <Table variant="simple" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>Название фирмы</Th>
                  <Th>Номер документа основания</Th>
                  <Th>Вид услуг</Th>
                  <Th>Дата окончания договора</Th>
                  <Th>Ссылка на документы в fog</Th>
                  <Th>Комментарий</Th>
                  <Th>Изменить</Th>
                </Tr>
              </Thead>
              <Tbody>
                {license?.map((data) => (
                  <Tr key={data?._id}>
                    <Td>{data.firmName}</Td>
                    <Td>{data.docNumber}</Td>
                    <Td>{data.service}</Td>
                    <Td
                      color={
                        moment(data.endDate)
                          .subtract(2, "months")
                          .isBefore(moment())
                          ? "red"
                          : "green"
                      }
                    >
                      {data.endDate}
                    </Td>
                    <Td>{data.docLink}</Td>
                    <Td>{data.comment}</Td>
                    <Td>
                      <EditButtons value={data} />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>{" "}
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </Box>
  );
};
export default LicenseTable;
