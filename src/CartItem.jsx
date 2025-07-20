import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
    const cart = useSelector(state => state.cart.items);          // 🛒 current cart
    const dispatch = useDispatch();

    /* ---------- helpers ---------- */

    // Overall cart total
    const calculateTotalAmount = () =>
        cart
            .reduce(
                (total, item) =>
                    total + item.quantity * item.cost, // strip “$”
                0
            )
            .toFixed(2);

    // Sub‑total for a single item line
    const calculateTotalCost = item =>
        (item.quantity * item.cost)

    /* ---------- event handlers ---------- */

    const handleContinueShopping = e => {
        // bubble up to parent page
        onContinueShopping?.(e);
    };

    const handleIncrement = item => {
        dispatch(
            updateQuantity({ name: item.name, quantity: item.quantity + 1 })
        );
    };

    const handleDecrement = item => {
        if (item.quantity > 1) {
            dispatch(
                updateQuantity({ name: item.name, quantity: item.quantity - 1 })
            );
        } else {
            // quantity would drop to 0 → remove the item
            dispatch(removeItem({ name: item.name }));
        }
    };

    const handleRemove = item => {
        dispatch(removeItem(item.name));
    };

    // Placeholder checkout (optional stretch goal)
    const handleCheckoutShopping = () => {
        alert('Hey thanks for shopping with us. Happy gardening..😃');
    };

    /* ---------- UI ---------- */

    return (
        <div className="cart-container">
            <h2 style={{ color: 'black' }}>
                Total Cart Amount: ${calculateTotalAmount()}
            </h2>

            {cart.map(item => (
                <div className="cart-item" key={item.name}>
                    <img
                        className="cart-item-image"
                        src={item.image}
                        alt={item.name}
                    />

                    <div className="cart-item-details">
                        <div className="cart-item-name">{item.name}</div>
                        <div className="cart-item-cost">${item.cost}</div>

                        {/* qty controls */}
                        <div className="cart-item-quantity">
                            <button
                                className="cart-item-button cart-item-button-dec"
                                onClick={() => handleDecrement(item)}
                            >
                                –
                            </button>

                            <span className="cart-item-quantity-value">
                                {item.quantity}
                            </span>

                            <button
                                className="cart-item-button cart-item-button-inc"
                                onClick={() => handleIncrement(item)}
                            >
                                +
                            </button>
                        </div>

                        <div className="cart-item-total">
                            Total: ${calculateTotalCost(item)}
                        </div>

                        <button
                            className="cart-item-delete"
                            onClick={() => handleRemove(item)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}

            {/* navigation buttons */}
            <div className="continue_shopping_btn">
                <button
                    className="get-started-button"
                    onClick={handleContinueShopping}
                >
                    Continue Shopping
                </button>

                <br />

                <button
                    className="get-started-button1"
                    onClick={handleCheckoutShopping}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default CartItem;
