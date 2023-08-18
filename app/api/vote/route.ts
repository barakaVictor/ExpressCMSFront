import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    
    const data = await request.json()
    console.log(data)
    return NextResponse.json({data: data});
};