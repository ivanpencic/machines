import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MachineDetails from './machines/MachineDetails';
import MachineList from './machines/MachineList';
import { GlobalProvider } from './utils/GlobalContext';
import ProtectedRoute from './utils/ProtectedRoute';
import Login from './auth/Login';
import Navigation from './components/Navigation';
import NotFound from './components/NotFound';


function About() {
  return <h1>O nama</h1>;
}

function App({ initialState }) {
  const [authenticated, setAuthenticated] = useState(initialState.isAuthenticated);
  const [user, setUser] = useState(initialState.user);
  return (
    <GlobalProvider initialState={initialState}>
      <Router>
        <Navigation />

        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <MachineList />
            </ProtectedRoute>
          } 
          />
          <Route path="/login" element={<Login setAuthenticated={setAuthenticated} setUser={setUser} />} />
          <Route path="/about" element={<About />} />
          <Route path="/machines/:machineId" element={
            <ProtectedRoute>
              <MachineDetails />
            </ProtectedRoute>
          }/>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;