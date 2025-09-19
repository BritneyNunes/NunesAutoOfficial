import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Container, Box, TextField, Button, Grid, Paper, Divider } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import './Checkout.css';
const apiUrl = import.meta.env.VITE_API_URL;

function Checkout() {
    // State variables for form fields and cart data
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
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

    // Fetch cart items from the server (simulated)
    useEffect(() => {
        const fetchCart = async () => {
            try {
                // Simulate fetching cart data from a real API
                const response = await fetch("http://localhost:3000/cart");
                if (!response.ok) {
                    throw new Error("Failed to fetch cart");
                }
                const data = await response.json();
                setCartItems(data);
            } catch (error) {
                console.error("Error fetching cart:", error);
                setMessage("Could not load cart. Please try again.");
            }
        };
        fetchCart();
    }, []);

    // Calculate subtotal, taxes, and total whenever cartItems change
    useEffect(() => {
        const calculatedSubtotal = cartItems.reduce((acc, item) => {
            const price = Number(item.Price.replace(/[^0-9.-]+/g, "")) || 0;
            return acc + price;
        }, 0);
        setSubtotal(calculatedSubtotal);
        setTaxes(0); // Assuming taxes are free as per the design
        setTotal(calculatedSubtotal + taxes);
    }, [cartItems, taxes]);

    // Handle form field changes with specific formatting and validation
    const handleCardDetailsChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === 'cardNumber') {
            // Remove all non-digit characters
            formattedValue = formattedValue.replace(/\D/g, '');
            // Add a space every 4 digits
            formattedValue = formattedValue.replace(/(.{4})/g, '$1 ').trim();
            // Limit to 19 characters (16 digits + 3 spaces)
            if (formattedValue.length > 19) {
                formattedValue = formattedValue.substring(0, 19);
            }
        } else if (name === 'expiry') {
            // Remove all non-digit characters
            formattedValue = formattedValue.replace(/\D/g, '');
            // Add a slash after 2 digits
            if (formattedValue.length > 2) {
                formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2, 4);
            }
            // Limit to 5 characters (MM/YY)
            if (formattedValue.length > 5) {
                formattedValue = formattedValue.substring(0, 5);
            }
        } else if (name === 'cvc') {
            // Remove all non-digit characters
            formattedValue = formattedValue.replace(/\D/g, '');
            // Limit to 3 or 4 digits (common CVC length)
            if (formattedValue.length > 4) {
                formattedValue = formattedValue.substring(0, 4);
            }
        }

        setCardDetails(prevDetails => ({
            ...prevDetails,
            [name]: formattedValue
        }));
    };

    // Handle form submission
    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        // Simulate payment processing
        try {
            const response = await new Promise(resolve => setTimeout(() => {
                // Simulate success or failure
                const isSuccess = Math.random() > 0.2; // 80% chance of success
                if (isSuccess) {
                    resolve({ status: 200, message: "Order placed successfully!" });
                } else {
                    resolve({ status: 400, message: "Payment failed. Please try again." });
                }
            }, 2000));

            if (response.status === 200) {
                setMessage(response.message);
                // In a real app, you would call an API to clear the cart
                await fetch('http://localhost:3000/clear-cart', { method: 'POST' });
                // Redirect to a success page
                navigate('/orders');
            } else {
                setMessage(response.message);
            }
        } catch (error) {
            console.error("Payment error:", error);
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
                <Typography variant="h4" component="h2" align="center" gutterBottom className="checkout-title">
                    Payment
                </Typography>

                <form onSubmit={handlePlaceOrder}>
                    <Box className="payment-section">
                        <Typography variant="h6" gutterBottom className="section-title">
                            Card Details
                        </Typography>
                        <TextField
                            label="Card Number"
                            name="cardNumber"
                            value={cardDetails.cardNumber}
                            onChange={handleCardDetailsChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
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
                                    variant="outlined"
                                    placeholder="MM/YY"
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Secure Code"
                                    name="cvc"
                                    value={cardDetails.cvc}
                                    onChange={handleCardDetailsChange}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
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
                            <Typography variant="body1">Subtotal:</Typography>
                            <Typography variant="body1">R{subtotal.toLocaleString()}</Typography>
                        </Box>
                        <Box className="summary-item">
                            {/* <Typography variant="body1">Taxes:</Typography>
                            <Typography variant="body1">R{taxes.toLocaleString()}</Typography> */}
                        </Box>
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
                        {isLoading ? 'Processing...' : 'Place Order'}
                    </Button>

                    {message && (
                        <Box className="message-box" mt={2}>
                            <Typography variant="body2" align="center" color="error">
                                {message}
                            </Typography>
                        </Box>
                    )}
                </form>
            </Paper>
        </Container>
    );
}

// Export the main component
export default Checkout;
