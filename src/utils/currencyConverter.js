import logger from "#config/logger.js";
import axios from "axios";

export const convertINRtoUSD = async (amountInINR) => {
    try {
        // Try to fetch live exchange rate from a free API
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/INR', {
            timeout: 5000 // 5 second timeout
        });
        
        const exchangeRate = response.data.rates.USD;
        const amountInUSD = amountInINR * exchangeRate;
        
        logger.info('Currency conversion', { 
            amountInINR, 
            amountInUSD: amountInUSD.toFixed(2), 
            exchangeRate 
        });
        
        return amountInUSD;
    } catch (error) {
        logger.warn('Failed to fetch live exchange rate, using fallback', { error: error.message });
    }
    
    // Fallback exchange rate (approximate: 1 INR ≈ 0.012 USD)
    const fallbackRate = 0.012;
    const amountInUSD = amountInINR * fallbackRate;
    
    logger.info('Currency conversion using fallback rate', { 
        amountInINR, 
        amountInUSD: amountInUSD.toFixed(2), 
        fallbackRate 
    });
    
    return amountInUSD;
};


export const convertItemsToUSD = async (items) => {
    const conversions = await Promise.all(
        items.map(async (item) => ({
            ...item,
            priceUSD: await convertINRtoUSD(item.price)
        }))
    );
    
    return conversions;
};
