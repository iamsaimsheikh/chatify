import React from "react";
import { Container, Box, Text } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import LoginForm from "../components/loginForm/LoginForm.js";
import SignupForm from "../components/signupForm/SignupForm.js";

const Homepage = () => {
  return (
    <Container maxW="xl" centerContent pt={10} gap={8}>
      <Box d="flex" justifyContent="center" flexDir="column">
        <Text color="#ffffff" fontSize={42} textAlign="center">
          CHATIFY <ChatIcon color="#006ee6" />
        </Text>
        <Text textAlign="center" fontSize={20} color="#ffffff" mt={2}>
          Welcome to Chatify!
        </Text>
      </Box>
      <Box width="70%">
        <Tabs variant="unstyled" gap={8}>
          <TabList>
            <Tab width="50%" bg='grey' _selected={{ color: "white", bg: "#006ee6" }}>
              Login
            </Tab>
            <Tab width="50%" bg='grey' _selected={{ color: "white", bg: "#006ee6" }}>
              Sign Up
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <LoginForm />
            </TabPanel>
            <TabPanel>
              <SignupForm />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
