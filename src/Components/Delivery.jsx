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

    const handleContinueToPayment = async (e) => {
        e.preventDefault();

        sessionStorage.setItem('nunesAutoDeliveryDetails', JSON.stringify(deliveryDetails));

        const storedOrder = JSON.parse(localStorage.getItem("orderData"));
        if (!storedOrder || !storedOrder.products || storedOrder.products.length === 0) {
            alert("Your cart is empty. Please add items before checkout.");
            return; 
        }

        const templateParams = {
            to_email: deliveryDetails.email,

            fullName: deliveryDetails.fullName,
            email: deliveryDetails.email,
            addressLine: deliveryDetails.addressLine,
            city: deliveryDetails.city,
            postalCode: deliveryDetails.postalCode,
            phoneNumber: deliveryDetails.phoneNumber,

            // Delivery option flattened
            deliveryName: storedOrder.deliveryOption.name,
            deliveryPrice: storedOrder.deliveryOption.price,

            // Product array formatted for EmailJS
            products: storedOrder.products.map(p => ({
                name: p.Name,
                price: p.Price
            })),

            subtotal: storedOrder.subtotal,
            total: storedOrder.total
        };

        try {
            await emailjs.send(
                "service_fru4fgk",
                "template_jnsiogm",
                templateParams,
                "NtcoRuX6i6c0q2X2R"
            );

            console.log("Order confirmation email sent successfully!");
            navigate('/confirmation');
        } catch (error) {
            console.error("EmailJS failed:", error);
            alert("Order placed! Confirmation email failed to send — we'll contact you shortly.");
            navigate('/confirmation');
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

                        <TextField label="Full Name" name="fullName" value={deliveryDetails.fullName} onChange={handleChange} fullWidth margin="normal" required />
                        <TextField label="Email" name="email" type="email" value={deliveryDetails.email} onChange={handleChange} fullWidth margin="normal" required />
                        <TextField label="Address Line" name="addressLine" value={deliveryDetails.addressLine} onChange={handleChange} fullWidth margin="normal" required />

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField label="City" name="city" value={deliveryDetails.city} onChange={handleChange} fullWidth margin="normal" required />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField label="Postal Code" name="postalCode" value={deliveryDetails.postalCode} onChange={handleChange} fullWidth margin="normal" required />
                            </Grid>
                        </Grid>
         
                        <TextField label="Phone Number" name="phoneNumber" value={deliveryDetails.phoneNumber} onChange={handleChange} fullWidth margin="normal" required />
                    </Box>

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        className="place-order-button"
                        sx={{
                            backgroundColor: '#e33434',
                            '&:hover': { backgroundColor: '#c02d2d' },       
                            padding: '16px',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            marginTop: '24px', 
                            textTransform: 'none'
                        }}
                    >
                        Continue to Payment
                    </Button>
                </form>
            </Paper>
        </Container>
    ); 
}

export default Delivery;
