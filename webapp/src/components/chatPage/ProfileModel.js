import React from "react";
import {
  IconButton,
  useDisclosure,
  Button,
  Text,
  Image,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { ChatState } from "../../context/ChatProvider";

const ProfileModel = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <>
          <IconButton
            d={{ base: "flex" }}
            icon={<ViewIcon />}
            onClick={onOpen}
          ></IconButton>
        </>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader backgroundColor="#222222">
            <Text color="#ffffff" textAlign="center">
              {user.name}
            </Text>
          </ModalHeader>
          <ModalCloseButton color="#ffffff" />
          <ModalBody
            backgroundColor="#222222 !important"
            justifyContent="center"
            display="flex"
            flexDir="column"
            pb="5"
          >
            <Image
              src={user.picture}
              alt={user.name}
              borderRadius="full"
              boxSize="150px"
              alignSelf="center"
            />
            <Text color="#ffffff" textAlign="center" mt={5}>{user.email}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModel;
