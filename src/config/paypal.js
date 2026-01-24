import { Client, Environment, OrdersController } from '@paypal/paypal-server-sdk';

const initializePayPalClient = () => {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    // Create PayPal client with sandbox environment configuration
    const client = new Client({
        clientCredentialsAuthCredentials: {
            oAuthClientId: clientId,
            oAuthClientSecret: clientSecret
        },
        environment: Environment.Sandbox,
    });

    return client;
};

// Initialize PayPal client
const paypalClient = initializePayPalClient();

// Initialize Orders Controller for creating and managing PayPal orders
const paypalOrdersController = new OrdersController(paypalClient);

export default paypalOrdersController;

