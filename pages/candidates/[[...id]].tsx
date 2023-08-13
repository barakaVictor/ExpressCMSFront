import React from 'react'
import { prisma } from '@/utils/connect'
import { GetServerSideProps } from 'next'
import { ElectionType } from '@/types/types';

type Props = {
  election?: ElectionType;
};

function candidate({election}: Props){
  return (
    <>
     <div>{election?.name}</div>
      <div className="w-screen overflow-x-scroll text-red-500">
        <div className="w-max flex">
          {election?.candidates.map((candidate, index) => {
          return(
          <div key={index} className="w-screen h-[60vh] flex flex-col items-center justify-around p-4 hover:bg-fuchsia-50 transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h-[90vh]">
            {candidate?.name}
            {candidate?.position?.name}
          </div>)
          })}
        </div>
      </div>
    </>
   
  )
}

export const getServerSideProps: GetServerSideProps = async(context) => {
  const {id} = context.query
  let election = null
  if(id){
    election = await prisma.election.findUnique({
      where: {
        id: Number(id[0])
      },
      include:{
        candidates: {
          include:  {
            position: true
          }
        }
      }
  });
  }
  return {
    props: { election: election? {
      id:election.id,
      name: election.name,
      candidates: election.candidates.map(candidate => {
        return {
          id: candidate.id,
          name: candidate.name,
          position: {
            id: candidate.position.id,
            name: candidate.position.name
          }
        }
      })
    } : null },
  };
}

export default candidate