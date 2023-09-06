'use client';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { usersAPI } from '../../api.';
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
    axios.get<UserData[]>(usersAPI).then((res) => {console.log(res), setUsers(res.data)});
  }, []);

  return (
    <div>
      <h1>User Panel</h1>
      <TableContainer>
        <Table variant='striped' colorScheme='teal'>
          <TableCaption>User Details</TableCaption>
          <Thead>
            <Tr>
              <Th>id</Th>
              <Th>name</Th>
              <Th>email</Th>
              <Th>role</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td isNumeric>0.91444</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </div>
  );
};

export default page;
