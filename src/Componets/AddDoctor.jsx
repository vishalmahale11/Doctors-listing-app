import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";

const initValue = {
  name: "",
  hospital: "",
  speciallisation: "",
  salary: "",
};

const AddDoctor = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState(initValue);
  const [user, setUser] = useState([]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser([...user, formData]);
    setFormData(initValue);
  };

  console.log(formData);

  const handleAddDoctor = () => {
    const payload = {
      name: formData.name,
      hospital: formData.hospital,
      speciallisation: formData.speciallisation,
      salary: formData.salary,
    };
    return fetch(`https://doctorsap.herokuapp.com/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then((res) => res.json());
  };

  return (
    <Box>
      <Button onClick={onOpen}>ADD DOCTOR</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ADD DOCTOR</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl onSubmit={handleSubmit}>
              <FormLabel>Name</FormLabel>
              <Input
                onChange={handleChange}
                value={formData.name}
                placeholder="Name"
                type="text"
                name="name"
              />
              <FormLabel>Select Hospital</FormLabel>
              <Select
                name="hospital"
                onChange={handleChange}
                placeholder="Hospital"
              >
                <option value="Manipal">Manipal</option>
                <option value="Dhule">Dhule</option>
                <option value="Nanded">Nanded</option>
              </Select>
              <FormLabel>Speciallisation</FormLabel>
              <Select
                name="speciallisation"
                onChange={handleChange}
                placeholder="Speciallisation"
              >
                <option value="Nephrology">Nephrology</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Nephrology">Nephrology</option>
              </Select>
              <FormLabel>Salary</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  children="₹"
                />
                <Input
                  name="salary"
                  onChange={handleChange}
                  type="number"
                  placeholder="Enter amount"
                />
              </InputGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleAddDoctor} variant="ghost">
              Add Doctor
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AddDoctor;
