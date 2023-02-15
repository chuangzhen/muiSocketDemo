import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "src/pages/home/App"
import Chat from 'src/pages/chat'


import { io } from 'socket.io-client'
const socket = io('http://localhost:4000')


function RoutesIndex() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home socket={socket} />} />
                <Route path='/chat' element={<Chat socket={socket} />} />
            </Routes>
        </BrowserRouter>
    )
}


export default RoutesIndex