import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import AddDoctor from "../Componets/AddDoctor";
import AddHospital from "../Componets/AddHospital";
import Doctorslist from "../Componets/Doctorslist";

const Home = () => {
  return (
    <>
      <Flex pt="4rem" justifyContent="center" gap="1rem">
        <AddDoctor />
        <AddHospital />
      </Flex>
      <Box pt="4rem">
        <Doctorslist />
      </Box>
    </>
  );
};

export default Home;
