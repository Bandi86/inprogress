import { Book } from "../types/book";

export const validateBook = (book: Book) => {
// check all input fields
    if (book.title === "") {
        return false;
    }
    if (book.author === "") {
        return false;
    }
    if (book.isbn === "") {
        return false;
    }
    if (book.price === 0) {
        return false;
    }
    if (book.image === "") {
        return false;        
    }
    if (book.description === "") {
        return false;
    }
    if (book.category_id === "") {
        return false;
    }
    return true;
}