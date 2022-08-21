import {
  Box,
  Button,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const getData = async ({ page, sortBy }) => {
  const res = await fetch(
    `https://doctorsap.herokuapp.com/users?_limit=5&_page=${page}&_sort=salary&_order=${sortBy}`
  );
  return await res.json();
};

const Doctorslist = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("asc");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getData({ page, sortBy })
      .then((res) => {
        console.log(res);
        setData(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(true);
      });
  }, [page, sortBy]);

  const handleDelete = (id) => {
    setIsLoading(true);
    return fetch(`https://doctorsap.herokuapp.com/users/${id}`, {
      method: "DELETE",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((res) => {
        setIsLoading(false);
        return getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Heading>Doctor's List</Heading>
      <Box pt="3rem">{isLoading && <Heading>...Loading</Heading>}</Box>
      <TableContainer pt="2rem">
        <Table>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Hospital</Th>
              <Th>Specialisation</Th>
              <Th
                style={{ cursor: "pointer" }}
                onClick={() => setSortBy(sortBy === "asc" ? "desc" : "asc")}
              >
                Salary
                <Button>^</Button>
              </Th>
              <Th>Details</Th>
              <Th>REMOVE</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr key={item.id}>
                <Td>{item.id}</Td>
                <Td>{item.name}</Td>
                <Td>{item.hospital}</Td>
                <Td>{item.speciallisation}</Td>
                <Td>{item.salary}</Td>
                <Td>
                  <Link to={`/doctor/${item.id}`}>View More Details</Link>
                </Td>
                <Td>
                  <Button
                    onClick={() => handleDelete(item.id)}
                    colorScheme="red"
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
        PREV
      </Button>
      <Button>{page}</Button>
      <Button onClick={() => setPage(page + 1)}>NEXT</Button>
    </>
  );
};

export default Doctorslist;
