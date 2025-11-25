import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Container, Box, TextField, Button, Paper, Grid } from '@mui/material';
import "./Delivery.css";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { sendEmail } from '../Utilities/Email';
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
    const handleContinueToPayment = async (e) => {
        e.preventDefault();
        
        sessionStorage.setItem(
    'nunesAutoDeliveryDetails',
    JSON.stringify(deliveryDetails)
);

// Send email to the user who entered their email
const storedOrder = JSON.parse(localStorage.getItem("orderData"));
// Build the product list as HTML
// Build the product list HTML with inline styling
const productListHtml = storedOrder.products.map(
  (product, index) => `
    <tr style="background-color: #1d3a6d; color: white;">
      <td style="padding: 10px; border: 1px solid #0b1a36;">${index + 1}. ${product.Name}</td>
      <td style="padding: 10px; border: 1px solid #0b1a36; text-align: right;">${product.Price}</td>
    </tr>
  `
).join('');

// Build the full email content with styled table
const emailContent = `
<div style="font-family: Arial, sans-serif; background: white; padding: 20px;">
  <h3 style="text-align: center; color: black;">Hello ${deliveryDetails.fullName},</h3>
  <p style="text-align: center; color: black;">Thank you for your order! Here is a summary of your purchase:</p>
  <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
    <thead>
      <tr style="background-color: #103666; color: white;">
        <th style="padding: 12px; border: 1px solid #0b1a36; text-align: left;">Product</th>
        <th style="padding: 12px; border: 1px solid #0b1a36; text-align: right;">Price</th>
      </tr>
    </thead>
    <tbody>
      ${productListHtml}
      <tr style="background-color: #5b7fb5; color: white; font-weight: bold;">
        <td style="padding: 10px; border: 1px solid #0b1a36;">Subtotal</td>
        <td style="padding: 10px; border: 1px solid #0b1a36; text-align: right;">R${storedOrder.subtotal}</td>
      </tr>
      <tr style="background-color: #5b7fb5; color: white; font-weight: bold;">
        <td style="padding: 10px; border: 1px solid #0b1a36;">Delivery (${storedOrder.deliveryOption.name})</td>
        <td style="padding: 10px; border: 1px solid #0b1a36; text-align: right;">R${storedOrder.deliveryOption.price}</td>
      </tr>
      <tr style="background-color: #e33434; color: white; font-weight: bold;">
        <td style="padding: 10px; border: 1px solid #0b1a36;">Total</td>
        <td style="padding: 10px; border: 1px solid #0b1a36; text-align: right;">R${storedOrder.total}</td>
      </tr>
    </tbody>
  </table>
  <p style="text-align: center; color: white;">We will process your order soon and notify you when it ships.</p>
  <p style="text-align: center; color: #e33434; font-weight: bold;">Thank you for shopping with NunesAuto!</p>
</div>
`;

// Send email
await sendEmail(
  deliveryDetails.Email,
  "Order Confirmation - Nunes Auto",
  emailContent
);



  console.log(storedOrder)

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
                            value={deliveryDetails.Email}
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