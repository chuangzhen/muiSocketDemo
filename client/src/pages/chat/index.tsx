import React from "react";
import { Box, styled } from '@mui/material'
import ContactBar from "./components/ContactBar";
import ChatBody from "./components/ChatBody";
import { Socket } from 'socket.io-client'

const ContainerBox = styled(Box)(({ theme }) => ({
    padding: '20px',
    margin: '20px auto',
    width: '800px',
    height: '600px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    borderRadius: 4
}))



function ChatIndex({ socket }: Props) {





    return <ContainerBox>
        这是聊天页
        <ContactBar socket={socket} />

    </ContainerBox>
}


export default ChatIndex