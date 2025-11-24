import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Container, Box, TextField, Button, Paper, Grid } from '@mui/material';
import "./Delivery.css";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { sendEmail } from '../Utilities/Email'
import Confirmation from './Confirmation';


function Delivery() {
    const navigate = useNavigate();
    const [deliveryDetails, setDeliveryDetails] = useState({
        fullName: '',
        addressLine: '',
        Email: '',
        city: '',
        postalCode: '',
        phoneNumber: ''
    });
    
    // Load existing details from sessionStorage on mount (if user navigates back)
    useEffect(() => {
        const savedDetails = sessionStorage.getItem('nunesAutoDeliveryDetails');
        if (savedDetails) {
            setDeliveryDetails(JSON.parse(savedDetails));
        }
    }, []);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDeliveryDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    // Handle form submission and navigate to payment
    const handleContinueToPayment = (e) => {
    e.preventDefault();

    sessionStorage.setItem('nunesAutoDeliveryDetails', JSON.stringify(deliveryDetails));

    sendEmail(); // Only once
    navigate('/confirmation'); 
};


    return (
        <Container className="checkout-container">
            <Paper className="checkout-content" elevation={3}>
                {/* Back button goes to the shopping cart */}
                <Link to="/cart" className="back-button">
                    <KeyboardBackspaceIcon />
                </Link>
                <Typography variant="h4" component="h2" align="center" gutterBottom className="checkout-title">
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
                            variant="outlined"
                            required
                        />


                        <TextField
                            label="Email"
                            name="Email"
                            type="email"
                            value={deliveryDetails.email}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />

                        <TextField
                            label="Address Line"
                            name="addressLine"
                            value={deliveryDetails.addressLine}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
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
                                    variant="outlined"
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
                                    variant="outlined"
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
                            variant="outlined"
                            required
                        />

                    </Box>

                    <Button
                       type="submit"
                       variant="contained"
                       color="primary"
                       fullWidth
                       className="place-order-button"
                    >
                    Continue
                    </Button>


                </form>
            </Paper>
        </Container>
    );
}

export default Delivery;