import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

//Fetch all Elections

export const GET = async () => {
    try {
        const elections = await prisma.election.findMany()
        return new NextResponse(
            JSON.stringify(elections),
            { status: 200 }
        );
    } catch (err) {
        console.log(err);
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong"}),
            { status: 500 }
        );
    }
};

export const POST = () => {
    return new NextResponse("Hello", { status: 200});
};

