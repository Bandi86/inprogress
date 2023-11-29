import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MaxWidthWrapper from './components/MaxWidthWrapper';
import Navbar from './components/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/Home';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const HomeWithUser: React.FC<{ user: User | null }> = ({ user }) => {
  return <Home user={user} />;
};

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <MaxWidthWrapper>
        <Navbar />
        <Layout>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<HomeWithUser user={user} />} />
          </Routes>
        </Layout>
      </MaxWidthWrapper>
    </>
  );
}

export default App;
