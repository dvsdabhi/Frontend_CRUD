import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Read from './components/Read';

function App() {
  return (
    <div>
      <Routes>
        <Route path='' element={<Read/>}/>
      </Routes>
    </div>
  );
}

export default App;
