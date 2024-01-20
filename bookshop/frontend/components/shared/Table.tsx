import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

import { FaRegEdit } from 'react-icons/fa'
import { MdDelete, MdOutlineCreateNewFolder } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'
import AdminTableModal from './AdminTableModal'

interface TableProps {
  data: any[]
  columns: string[]
  tableCaptionText?: string
  type: string
  /* event: React.MouseEvent<HTMLButtonElement> */
}

const SharedTable: React.FC<TableProps> = ({
  data,
  columns,
  tableCaptionText,
  type
}) => {

    const [showModal, setShowModal] = useState<boolean>(false)
    const [selectedRow, setSelectedRow] = useState<any>(null);

    const handleClick = (row: any) => {
      setSelectedRow(row);
      setShowModal(true);
    };

  return (
    <section className='w-auto h-screen p-10'>
      <Table className='overflow-auto'>
        <TableCaption>
          <span className='font-semibold text-lg text-black'>
            {data.length}
          </span>{' '}
          {tableCaptionText}
        </TableCaption>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead
                key={index}
                className='font-semibold text-lg text-black'
              >
                {column}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column, index) => (
                <React.Fragment key={index}>
                  <TableCell>{row[column]}</TableCell>
                </React.Fragment>
              ))}
              <div className='flex gap-4 text-3xl pt-4'>
                <MdOutlineCreateNewFolder className='cursor-pointer' />
                <CgProfile
                  className='cursor-pointer'
                  onClick={() => handleClick(row)}
                />
                <FaRegEdit className='cursor-pointer' />
                <MdDelete className='cursor-pointer' />
              </div>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {showModal && (
        <AdminTableModal
          showModal={showModal}
          type={type}
          setShowModal={setShowModal}
          rowData={selectedRow}
        />
      )}
      <div className='p-10'>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href='#' />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#'>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href='#' />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  )
}

export default SharedTable
