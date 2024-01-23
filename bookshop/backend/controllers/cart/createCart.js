import Cart from "../../models/cart.js";

// create the cart for user

export const createCart = async (req, res) => {
    // get user id from req.user
    const { user_id } = req.user;
    // get the cart from req.body
    const { cart } = req.body;
    // create the cart
    try {
        const newCart = await Cart.create({ user_id, cart });
        res.status(201).json({ newCart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}