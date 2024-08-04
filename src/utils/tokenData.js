// import { NextRequest } from "next/server";
// import jwt from "jsonwebtoken";

// export const getDataFromToken = ( NextRequest) => {
//     try {
//         const token = request.cookies.get("token")?.value || '';
//         const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
//         return decodedToken.id;
//     } catch (error) {
//         throw new Error(error.message);
//     }

// }

import jwt from "jsonwebtoken";

// Function to extract data from the token
export const getDataFromToken = (request) => {
    try {
        // Access the token from cookies using the request object
        const token = request.cookies.get("token")?.value || '';
        
        // Verify the JWT token using the secret key
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        
        // Return the decoded user ID
        return decodedToken.id;
    } catch (error) {
        // Throw an error if verification fails
        throw new Error(error.message);
    }
}
