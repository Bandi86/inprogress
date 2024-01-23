import Cart from "../../models/cart.js";

// delete cart

export const deleteCart = async (req, res) => {
    try {
        const { cart_id } = req.params;
        await Cart.destroy({ where: { cart_id } });
        res.status(200).json({ message: "Cart deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}