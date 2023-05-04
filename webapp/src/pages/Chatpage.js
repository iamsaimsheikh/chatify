import React from "react";
import { ChatState } from "../context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/chatPage/SideDrawer";
import MyChats from "../components/chatPage/MyChats";
import ChatBox from "../components/chatPage/ChatBox";

const Chatpage = () => {
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display='flex'
        justifyContent='space-between'
        w="95%"
        h="91vh"
        p='10'
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};

export default Chatpage;
