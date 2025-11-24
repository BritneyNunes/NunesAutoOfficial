import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Container, Box, TextField, Button, Grid, Paper, Divider } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import './Checkout.css';
import { getBaseUrl } from "../Utilities/getBaseUrl";

const baseUrl = getBaseUrl();

function Checkout() {
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [delivery, setDelivery] = useState(0);
    const [taxes, setTaxes] = useState(0);
    const [total, setTotal] = useState(0);
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiry: '',
        cvc: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // ➤ Fetch Cart Items
    const fetchCart = async () => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user.CustomerID) {
            console.error("No user in localStorage.");
            setMessage("User not logged in.");
            return;
        }

        const response = await fetch(`${baseUrl}/cart/${user.CustomerID}`);

        console.log("Fetching cart for:", user.CustomerID);
        console.log("Cart fetch response:", response.status);

        if (!response.ok) {
            throw new Error("Failed to fetch cart");
        }

        const data = await response.json();
        console.log("Cart items received:", data);

        setCartItems(data);

    } catch (error) {
        console.error("Error fetching cart:", error);
        setMessage("Could not load cart. Please try again.");
    }
};


    // ➤ Calculate totals
    useEffect(() => {
     const storedOrder = JSON.parse(localStorage.getItem("orderData"));
       if (storedOrder) {
      setCartItems(storedOrder.products || []);
      setSubtotal(storedOrder.subtotal || 0);
      setDelivery(storedOrder.deliveryOption.price || 0);
      setTotal(storedOrder.total || 0);
    } else {
      // fallback: fetch from API if needed
      fetchCart();
    }
    }, []);

    // ➤ Handle input changes
    const handleCardDetailsChange = (e) => {
        const { name, value } = e.target;
        let formatted = value;

        if (name === 'cardNumber') {
            formatted = formatted.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
            if (formatted.length > 19) formatted = formatted.substring(0, 19);
        }

        if (name === 'expiry') {
            formatted = formatted.replace(/\D/g, '');
            if (formatted.length > 2) formatted = formatted.substring(0, 2) + '/' + formatted.substring(2, 4);
            if (formatted.length > 5) formatted = formatted.substring(0, 5);
        }

        if (name === 'cvc') {
            formatted = formatted.replace(/\D/g, '');
            if (formatted.length > 4) formatted = formatted.substring(0, 4);
        }

        setCardDetails(prev => ({ ...prev, [name]: formatted }));
    };

    // ➤ Handle Submit
    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const response = await new Promise(resolve => setTimeout(() => {
                const isSuccess = Math.random() > 0.2;
                resolve({
                    status: isSuccess ? 200 : 400,
                    message: isSuccess ? "Order placed successfully!" : "Payment failed. Please try again."
                });
            }, 2000));

            if (response.status === 200) {
                await fetch(`${baseUrl}/clear-cart`, { method: 'POST' });
                navigate('/delivery');  // ➤ NEW FLOW: Go to delivery page after payment
            } else {
                setMessage(response.message);
            }

        } catch (error) {
            console.error(error);
            setMessage("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container className="checkout-container">
            <Paper className="checkout-content" elevation={3}>

                <Link to="/cart" className="back-button">
                    <KeyboardBackspaceIcon />
                </Link>

                <Typography variant="h4" align="center" gutterBottom className="checkout-title">
                    Checkout
                </Typography>

                <Divider className="summary-divider" />

                <form onSubmit={handlePlaceOrder}>
                    <Box className="payment-section">
                        <Typography variant="h6" gutterBottom className="section-title">
                            Payment Details
                        </Typography>

                        <TextField
                            label="Card Number"
                            name="cardNumber"
                            value={cardDetails.cardNumber}
                            onChange={handleCardDetailsChange}
                            fullWidth
                            margin="normal"
                            placeholder="**** **** **** ****"
                            required
                        />

                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    label="Expiry"
                                    name="expiry"
                                    value={cardDetails.expiry}
                                    onChange={handleCardDetailsChange}
                                    fullWidth
                                    margin="normal"
                                    placeholder="MM/YY"
                                    required
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    label="CVC"
                                    name="cvc"
                                    value={cardDetails.cvc}
                                    onChange={handleCardDetailsChange}
                                    fullWidth
                                    margin="normal"
                                    placeholder="CVC"
                                    required
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    <Divider className="summary-divider" />

                    <Box className="order-summary">
                        <Typography variant="h6" gutterBottom className="section-title">
                            Order Summary
                        </Typography>

                        <Box className="summary-item">
                            <Typography>Subtotal:</Typography>
                            <Typography>R{subtotal.toLocaleString()}</Typography>
                        </Box>

                        <Box className="summary-item">
                            <Typography>Delivery:</Typography>
                            <Typography>R{delivery.toLocaleString()}</Typography>
                        </Box>

                        {/* <p className="delivery-display">Delivery: R{selectedDelivery.price.toLocaleString()}</p> */}

                        <Box className="summary-item total-row">
                            <Typography variant="h5">Total:</Typography>
                            <Typography variant="h5">R{total.toLocaleString()}</Typography>
                        </Box>
                    </Box>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className="place-order-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : 'Pay & Continue'}
                    </Button>

                    {message && (
                        <Box className="message-box" mt={2}>
                            <Typography align="center" color="error">
                                {message}
                            </Typography>
                        </Box>
                    )}
                </form>
            </Paper>
        </Container>
    );
}

export default Checkout;
