import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';
import Room from './pages/RoomDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:roomId" element={<Room />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
