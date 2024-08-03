
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/utils/tokenData";

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