import { connect } from "@/dbConnect/dbConnect";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/utils/Mailer";


connect()

export async function POST(request) {
    try {
        const reqBody = await request.json()
        const { username, email, password } = reqBody

        console.log(reqBody);

        const user = await User.findOne({ email });

        if (user) {
            return NextResponse({ error: "User Email already exist" }, { status: 400 })

        }
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        const savedUser = await newUser.save()
        console.log(savedUser);

        const userId = savedUser._id
        //send verification email
        await sendEmail({email, emailType: "VERIFY", userId:userId})

        return NextResponse.json({
            message: "User created successfully",
            user: savedUser,
            success: true
        })

    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}