import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import io from 'socket.io-client';
import Home from "./views/home/Home";
import Hotel from "./views/hotel/Hotel";
import List from "./views/list/List";

function App() {

  const socket = io('http://localhost:8000', {transports: ['websocket']})

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotel/:id" element={<Hotel/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;