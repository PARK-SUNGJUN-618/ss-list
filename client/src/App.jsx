import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import SsList from './pages/SsList';
import SsDiary from './pages/SsDiary';
import Motion from './pages/Motion';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/ssList/*" element={<SsList />}></Route>
          <Route path="/ssDiary/*" element={<SsDiary />}></Route>
          <Route path="/motion/*" element={<Motion />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}