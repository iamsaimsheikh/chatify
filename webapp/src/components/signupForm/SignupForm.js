import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
} from "@chakra-ui/react";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");

  return (
    <VStack spacing={4} color="white">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <Input
          type="password"
          placeholder="Confirm you password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </FormControl>
      <FormControl id="picture" isRequired border="none">
        <FormLabel>Upload Picture</FormLabel>
        <Input
          border="none"
          pl="0"
          type="file"
          accept="image/*"
          placeholder="Confirm you password"
          onChange={(e) => setPic(e.target.files[0])}
        />
      </FormControl>
      <Button colorScheme="blue" width="100%">
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignupForm;
