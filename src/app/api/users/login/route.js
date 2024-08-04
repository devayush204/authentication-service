import { connect } from "@/dbConnect/dbConnect";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"

connect()

export async function POST(request) {
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody;
        const user = await User.findOne({ email });
        
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }
        console.log("user found");
        
        //check if pass is correct
        const isPasswordValid = await bcryptjs.compare(password, user.password)
        
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 })
        }
        console.log(user);

        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        
        //generate token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" })

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true, 
            
        })
        return response;
        
        


    }catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}
