import Cart from "../../models/cart.js";

// update cart

export const updateCart = async (req, res) => {
    try {
        const { cart_id } = req.params;
        const { cart } = req.body;
        const updatedCart = await Cart.update(
            { cart },
            { where: { cart_id }, returning: true }
        );
        res.status(200).json({ updatedCart: updatedCart[1][0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}