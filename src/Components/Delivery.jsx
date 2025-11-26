import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Container, Box, TextField, Button, Paper, Grid } from '@mui/material';
import "./Delivery.css";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import emailjs from '@emailjs/browser';

function Delivery() {
    const navigate = useNavigate();

    const [deliveryDetails, setDeliveryDetails] = useState({
        fullName: '',
        addressLine: '',
        email: '',
        city: '',
        postalCode: '',
        phoneNumber: ''
    });

    // Load saved delivery details on mount
    useEffect(() => {
        const savedDetails = sessionStorage.getItem('nunesAutoDeliveryDetails');
        if (savedDetails) {
            setDeliveryDetails(JSON.parse(savedDetails));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDeliveryDetails(prev => ({ ...prev, [name]: value }));
    };

    // Helper to safely format prices as "Rxx.xx"
    const formatPrice = (price) => {
        const num = typeof price === 'string' ? parseFloat(price) : price;
        if (isNaN(num)) return 'R0.00';
        return `R${num.toFixed(2)}`;
    };

    const handleContinueToPayment = async (e) => {
        e.preventDefault();

        // Save delivery details
        sessionStorage.setItem('nunesAutoDeliveryDetails', JSON.stringify(deliveryDetails));

        const storedOrder = JSON.parse(localStorage.getItem("orderData"));

        if (!storedOrder || !storedOrder.products || storedOrder.products.length === 0) {
            alert("Your cart is empty. Please add items before checkout.");
            return;
        }

        // EXACTLY MATCH EMAILJS TEMPLATE VARIABLE NAMES (case-sensitive!)
        const templateParams = {
            fullName: deliveryDetails.fullName.trim(),
            email: deliveryDetails.email.trim(),
            addressLine: deliveryDetails.addressLine.trim(),
            city: deliveryDetails.city.trim(),
            postalCode: deliveryDetails.postalCode.trim(),
            phoneNumber: deliveryDetails.phoneNumber.trim(),

            // Delivery option
            deliveryName: storedOrder.deliveryOption?.name || "Standard Delivery",
            deliveryPrice: formatPrice(storedOrder.deliveryOption?.price || 0),

            // Products array - MUST use lowercase "name" and "price" to match {{#each products}}
            products: storedOrder.products.map(p => ({
                name: p.Name || p.name || "Unknown Item",
                price: formatPrice(p.Price || p.price || 0)
            })),

            // Totals - formatted with R and 2 decimals
            subtotal: formatPrice(storedOrder.subtotal || 0),
            total: formatPrice(storedOrder.total || 0)
        };

        try {
            await emailjs.send(
                "service_fru4fgk",       // Your Service ID
                "template_jnsiogm",      // Your Template ID
                templateParams,
                "NtcoRuX6i6c0q2X2R"       // Your Public Key (User ID)
            );

            console.log("Order confirmation email sent successfully!");
            navigate('/confirmation');
        } catch (error) {
            console.error("EmailJS Error:", error);
            alert("Order placed successfully! Confirmation email failed — we’ll contact you shortly.");
            navigate('/confirmation'); // Still proceed to confirmation
        }
    };

    return (
        <Container className="checkout-container">
            <Paper className="checkout-content" elevation={3}>
                <Link to="/cart" className="back-button">
                    <KeyboardBackspaceIcon />
                </Link>

                <Typography variant="h4" align="center" gutterBottom className="checkout-title">
                    Delivery Details
                </Typography>

                <form onSubmit={handleContinueToPayment}>
                    <Box className="delivery-section">
                        <Typography variant="h6" gutterBottom className="section-title">
                            Shipping Information
                        </Typography>

                        <TextField
                            label="Full Name"
                            name="fullName"
                            value={deliveryDetails.fullName}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={deliveryDetails.email}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Address Line"
                            name="addressLine"
                            value={deliveryDetails.addressLine}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="City"
                                    name="city"
                                    value={deliveryDetails.city}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Postal Code"
                                    name="postalCode"
                                    value={deliveryDetails.postalCode}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    required
                                />
                            </Grid>
                        </Grid>

                        <TextField
                            label="Phone Number"
                            name="phoneNumber"
                            value={deliveryDetails.phoneNumber}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                    </Box>

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        className="place-order-button"
                        
                    >
                        Continue to Payment
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}

export default Delivery;