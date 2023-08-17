import { NextResponse } from "next/server";
import { prisma } from "@/utils/connect";

//Fetch all ElectivePositions

export const GET = async () => {
    try {
        const electivePosition = await prisma.electivePosition.findMany({
            include: {
                candidates: true,
                elections: {
                    include:{
                        positions: true,
                        candidates: true,
                        votes: true
                    }
                }
            }
        })
        return new NextResponse(
            JSON.stringify(electivePosition),
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

