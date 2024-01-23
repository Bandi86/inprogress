import Cart from "../../models/cart.js";

// get cart

export const getCart = async (req, res) => {
    try {
        const { cart_id } = req.params;
        const cart = await Cart.findOne({
        where: { cart_id },
        include: { all: true },
        });
        res.status(200).json({ cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}