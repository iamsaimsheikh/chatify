import {
  Box,
  Button,
  Tooltip,
  Text,
  Avatar,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Search2Icon, BellIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { ChatIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { ChatState } from "../../context/ChatProvider";
import ProfileModel from "./ProfileModel";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import UserListItem from "./UserListItem";

const SideDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const navigate = useNavigate();
  const { user } = ChatState();

  const logout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const toast = useToast();

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data.users);
    } catch (error) {
      toast({
        title: "Error occurred!",
        description: "Failed to load search results!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const accessChat = () => {};

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignContent="center"
        bg="#222222"
        p="10px 10px 10px 10px"
        borderBottom="0.5px solid grey"
      >
        <Tooltip label="Search Users" hasArrow placement="bottom-end">
          <Button variant="ghost" _hover={{ bg: "grey" }} onClick={onOpen}>
            <Search2Icon color="#006ee6" />
            <Text d={{ lg: "none", md: "flex" }} color="#ffffff" px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Box w="15%">
          <Text color="#ffffff" fontSize={24}>
            CHATIFY <ChatIcon color="#006ee6" />
          </Text>
        </Box>

        <Box>
          <BellIcon color="#006ee6" boxSize="7" />
          <Menu>
            <MenuButton _hover={{ bg: "none" }} bg="none" as={Button}>
              <Avatar
                name={user.name}
                src={user.picture}
                h="36px"
                w="36px"
                border="1px solid #006ee6"
              />
            </MenuButton>
            <MenuList backgroundColor="grey" border="none">
              <ProfileModel user={user}>
                <MenuItem
                  backgroundColor="grey"
                  border="none"
                  textAlign="left"
                  color="#fcfcfc"
                >
                  User Profile
                </MenuItem>
              </ProfileModel>
              <MenuItem
                backgroundColor="grey"
                border="none"
                color="#fcfcfc"
                onClick={logout}
              >
                Log out
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent backgroundColor="#222222" color="white">
            <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
            <DrawerBody>
              <Box display="flex" pb="2" pt={2} flexDir="row">
                <Input
                  placeholder="Search by email or name"
                  mr={2}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button backgroundColor="#006ee6" onClick={handleSearch}>
                  Go
                </Button>
              </Box>
              {loading ? (
                (
                  <ChatLoading />
                )
              ) : (
                searchResult?.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                ))
              )}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default SideDrawer;
