import jwt from 'jsonwebtoken';

// Define the authentication middleware function
const authenticate = (req, res, next) => {
    // Get the token from the request headers
    console.log(req.headers.authorization);
    const token = req.headers.authorization;

    // Check if the token exists
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded user information to the request object
        req.user = decoded.user;

        // Check if the user has admin role
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Call the next middleware or route handler
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export default authenticate;
