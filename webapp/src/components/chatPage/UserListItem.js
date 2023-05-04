import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";
import { ChatState } from "../../context/ChatProvider";

const UserListItem = ({user, handleFunction }) => {
  
    console.log(user)
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="none"
      color='#ffffff'
      boxShadow="6px 6px 20px rgba(0,0,0,0.2)"
      border='1px solid #006ee6'
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      display="flex"
      alignItems="center"
      px={3}
      py={2}
      mb={2}
      mt={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.picture}
      />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
