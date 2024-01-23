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
import { User } from '@/types/user'

interface TableProps {
  data: any[]
  columns: string[]
  tableCaptionText?: string
  type: string
 
}

const SharedTable: React.FC<TableProps> = ({
  data,
  columns,
  tableCaptionText,
  type,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<any>(null)
  const [selectedIcon, setSelectedIcon] = useState<string>('')

  const handleClick = (row: any, icon: string) => {
    setSelectedRow(row)
    setShowModal(true)
    setSelectedIcon(icon)
  }

  return (
    <section className='h-screen p-10'>
      <Table>
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

              {type === 'user' && (
                <div className='flex gap-4 text-3xl pt-4'>
                  <CgProfile
                    className='cursor-pointer'
                    onClick={() => handleClick(row, 'profile')}
                  />
                  <MdDelete
                    className='cursor-pointer'
                    onClick={() => handleClick(row, 'delete')}
                  />
                </div>
              )}

              {type === 'category' && (
                <div className='flex gap-4 text-3xl pt-4'>
                  <FaRegEdit
                    className='cursor-pointer'
                    onClick={() => handleClick(row, 'edit')}
                  />
                  <MdDelete
                    className='cursor-pointer'
                    onClick={() => handleClick(row, 'delete')}
                  />
                </div>
              )}

              {type === 'book' && (
                <div className='flex gap-4 text-3xl pt-4'>
                  <MdOutlineCreateNewFolder
                    className='cursor-pointer'
                    onClick={() => handleClick(row, 'new')}
                  />
                  <CgProfile
                    className='cursor-pointer'
                    onClick={() => handleClick(row, 'profile')}
                  />
                  <FaRegEdit
                    className='cursor-pointer'
                    onClick={() => handleClick(row, 'edit')}
                  />
                  <MdDelete
                    className='cursor-pointer'
                    onClick={() => handleClick(row, 'delete')}
                  />
                </div>
              )}
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
          selectedIcon={selectedIcon}
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
