import { Prisma } from '@prisma/client'
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (request: NextRequest) => {
    try{
        const { electionInformation, positions, voterInformation } = await request.json()
        //console.log(data)

        const election = await prisma.election.findUnique({
            where: {
                id: electionInformation.id,
                name: electionInformation.name
            }
        })

        const voter = await prisma.user.findUnique({
            where: {
                email: voterInformation.email,
                AND:{
                    role:{
                        name: "student"
                    }
                }
            },
            include: {
                student: true
            }
        })

        if(!election){
            return NextResponse.json({message: "Election not found"})
        }
        if(!voter){
            return NextResponse.json({message: "Voter not found"})
        }

        const votes = await Promise.all(
            positions.map(
                async (position: any) => {
                    try{
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
                                            userId: voter.id
                                        },
                                        where:{
                                            userId: voter.id
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

                        return {
                            position: position.name,
                            candidate: position.candidate,
                            status: "Success",
                            message: "Vote successfully submitted"
                        }
                    }catch(error){
                        if(error instanceof Prisma.PrismaClientKnownRequestError){
                            if (error.code === 'P2002') {
                                return {
                                    position: position.name,
                                    candidate: position.candidate,
                                    status: "Error",
                                    message: "Voter has already cast their vote for this position"
                                }
                            }
                        }else{
                            throw error
                        }
                    }
                }
            )
        )
        return NextResponse.json({data: votes});
    } 
    catch (err) {
        console.log(err);
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong"}),
            { status: 500 }
        );
    }
};