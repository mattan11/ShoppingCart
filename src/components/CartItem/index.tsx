import React from 'react';
import { CartItemProps } from './CartItem';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import storeItems from '../../data/items.json';
import { Button, Stack } from 'react-bootstrap';
import { formatCurrency } from '../../utilities/formatCurrency';

const CartItem = ({ id, quantity }: CartItemProps) => {
    const { removeFromCart } = useShoppingCart();
    const item = storeItems.find((item) => item.id === id);

    if (item === null) return null;
    if (item) {
        return (
            <Stack
                direction="horizontal"
                gap={2}
                className="d-flex align-items-center"
            >
                <img
                    src={item.imgUrl}
                    alt={item.name}
                    style={{
                        width: '125px',
                        height: '75px',
                        objectFit: 'cover',
                    }}
                />
                <div className="me-auto">
                    <div>
                        {item.name}{' '}
                        {quantity > 1 && (
                            <span
                                className="text-muted"
                                style={{ fontSize: '.65rem' }}
                            >
                                x{quantity}
                            </span>
                        )}
                    </div>
                    <div className="text-muted" style={{ fontSize: '.75rem' }}>
                        {formatCurrency(item.price)}
                    </div>
                </div>
                <div>{formatCurrency(item.price * quantity)}</div>
                <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                >
                    &times;
                </Button>
            </Stack>
        );
    }
};

export default CartItem;
