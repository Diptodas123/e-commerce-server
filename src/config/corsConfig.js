const clientUrl = (process.env.CLIENT_URL || 'http://localhost:5173').replace(/\/$/, '');

export const corsConfig = {
    "origin": clientUrl,
    "methods": ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
    ],
    "credentials": true
};
