import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/connect";

export const POST = async (request: NextRequest) => {
    
    const { electionInformation, positions, voterInformation } = await request.json()
    //console.log(data)

    const election = await prisma.election.findUnique({
        where: {
            id: electionInformation.id,
            name: electionInformation.name
        }
    })

    if(!election){
        return NextResponse.json({message: "Election not found"})
    }

    const votes = positions.map(async (position: any) => {
        const vote = await prisma.vote.create({
            data: {
                election: {
                    connect: {
                        id: election.id
                    }
                },
                position: {
                    connect: {
                        id: position.id
                    }
                }, 
                voter: {
                    connectOrCreate: {
                        create:{
                            userId: voterInformation.userId
                        },
                        where:{
                            userId: voterInformation.userId
                        }
                    }
                },
                candidate: {
                    connect: {
                        id: position.candidate.id
                    }
                }
            }
        })

        return vote
    })
    
    return NextResponse.json(votes);
};