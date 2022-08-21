import {
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const DoctorsDetails = () => {
  const [data, setData] = useState([]);
  const params = useParams();

  const getDetails = () => {
    return fetch(`https://doctorsap.herokuapp.com/users/${params.id}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDetails(params);
  }, []);

  return (
    <>
      <Heading>Doctor's Details</Heading>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Hospital</Th>
              <Th>Speciallisation</Th>
              <Th>Salary</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{data.id}</Td>
              <Td>{data.name}</Td>
              <Td>{data.hospital}</Td>
              <Td>{data.speciallisation}</Td>
              <Td>{data.salary}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DoctorsDetails;
