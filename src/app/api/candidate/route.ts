import { NextResponse } from "next/server";
import { prisma } from "@/utils/connect";

//Fetch all Elections

export const GET = async () => {
    try {
        const elections = await prisma.election.findMany({
            include: {
                faculty: true,
                candidates: {
                    include:{
                        position: true,
                        votes: true
                    }
                }
            }
        })
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

