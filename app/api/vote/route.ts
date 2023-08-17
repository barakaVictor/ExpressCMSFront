import { NextRequest, NextResponse } from "next/server";

export const POST = (request: NextRequest) => {
    console.log(request.body)
    const {body} = request
    return new NextResponse({data: body}, { status: 200});
};