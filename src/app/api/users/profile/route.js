
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { getDataFromToken } from "@/utils/tokenData";
import { connect } from "@/dbConnect/dbConnect";

connect();

export async function GET( NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        const user = await User.findOne({_id: userId}).select("-password")
        return NextResponse.json({
            mesaaage: "User found",
            data: user
        })

    } catch (error) {
        return NextResponse.json(
            {error: error.message},
            {status:400}
        )
    }
}
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { getDataFromToken } from "@/utils/tokenData";
import { connect } from "@/dbConnect/dbConnect";

// Establish database connection
connect();

// Define the GET function, accepting a request parameter
export async function GET(request) {
    try {
        // Retrieve the user ID from the token
        const userId = await getDataFromToken(request);
        
        // Find the user in the database, excluding the password
        const user = await User.findOne({ _id: userId }).select("-password");
        
        // Return a JSON response with the user data
        return NextResponse.json({
            message: "User found",
            data: user,
        });

    } catch (error) {
        // Return a JSON response with the error message and status code
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
    }
}
