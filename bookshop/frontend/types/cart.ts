export type Cart = {
    cart_id: string;
    user_id: string;   
    total_price: number;
    quantity: number;
    is_checked_out: boolean;
    date_checked_out: Date;
    cart_created_at: Date;
    cart_updated_at: Date;
}