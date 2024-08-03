import { connect } from "@/dbConnect/dbConnect";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


connect()

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const {token} = reqBody;

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: {$gt: Date.now()} })

        if(!user) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 })
        }
        console.log(user);

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();
        return NextResponse.json({ message: "Email verified successfully", success: true })
        
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}