export const corsConfig = {
    "origin": process.env.CLIENT_URL || 'http://localhost:5173',
    "methods": ["GET", "HEAD", "PUT", "POST", "DELETE"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
    ],
    "credentials": true
};
