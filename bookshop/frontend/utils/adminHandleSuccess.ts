import { SetStateAction } from 'react'
import { rootFetch } from './fetch'
import useBookStore from '@/store/bookStore'

export type handleSuccessProps = {
    setShowModal: (value: SetStateAction<boolean>) => void
}

export const handleSuccess = (setShowModal: (value: SetStateAction<boolean>) => void) => {
    rootFetch({
        setBooks: useBookStore.getState().setBooks,
        setCategories: () => {}, // Add a dummy function for setCategories
    })
    alert('Book operation successful')
    if (setShowModal) {
        setShowModal(false)
    }
}
