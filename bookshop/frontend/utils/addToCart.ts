import { Book } from "@/types/book"
import axios from "axios"

const  addToCart = async ( book: Book) => {
 // get the full book from props what added the user to cart
 const res = await axios.post('/api/cart', book)
}

export default addToCart
