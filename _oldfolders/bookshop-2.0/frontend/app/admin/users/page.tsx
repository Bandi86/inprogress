'use client';
import { useState, useEffect } from 'react';
import {apiUrls} from '../../api/api'
import axios from 'axios';

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
}

const page: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);

  console.log(users);

  useEffect(() => {
    axios.get<UserData[]>(apiUrls.userAPI).then((res) => {console.log(res), setUsers(res.data)});
  }, []);

  return (
    <>
      <h1>User Panel</h1>
      
    </>
  );
};

export default page;
