import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ChatPage from './pages/chatPage/ChatPage';
import MUIPage from './pages/mui'
import {io} from 'socket.io-client';
const socket = io('http://localhost:4000')


function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home socket={socket} />}></Route>
          <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
          <Route path='/mui' element={<MUIPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
