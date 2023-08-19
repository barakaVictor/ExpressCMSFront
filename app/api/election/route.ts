import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/connect";

//Fetch all Elections

export const GET = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')    
    try {
        if(id){
           const election = await prisma.election.findUnique({
                where: {
                  id: Number(id),
                },
                include: {
                  positions: {
                    include:{
                      candidates: {
                        include: {
                          _count: {
                            select: { votes: true },
                          }
                        }
                      }
                    }
                  }
                },
              });
              return NextResponse.json( 
                {
                ...election,
                  positions: election?.positions?.map((position: any) =>{
                      return {
                          ...position,
                          candidates: position?.candidates?.reduce((acc: Array<any>, candidate : any) => {
                            candidate.votes = candidate._count.votes
                              if(election.id === candidate.electionId) {acc.push(candidate)}
                              return acc
                          }, [])
                      }
                  })
              })
        }
        else
        {
          const elections = await prisma.election.findMany({
              include: {
                  positions: {
                    include:{
                      candidates: {
                        include: {
                          _count: {
                            select: { votes: true },
                          }
                        }
                      }
                    }
                  }
              },
          })
         
          return NextResponse.json( 
            elections
            .reduce((acc1: Array<any>, election: any)=>{
                  acc1.push({
                    ...election,
                      positions: election?.positions?.map((position: any) =>{
                          return {
                              ...position,
                              candidates: position?.candidates?.reduce((acc2: Array<any>, candidate : any) => {
                                candidate.votes = candidate._count.votes
                                  if(election.id === candidate.electionId) {acc2.push(candidate)}
                                  return acc2
                              }, [])
                          }
                      })
                  })
                return acc1
              }, [])
          )
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Something went wrong"})
    }
};

export const POST = () => {
    return new NextResponse("Hello", { status: 200});
};

