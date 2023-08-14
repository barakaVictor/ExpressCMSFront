import React, { useState, useEffect } from 'react'
import { prisma } from '@/utils/connect'
import { GetServerSideProps } from 'next'
import { ElectionType } from '@/types/types';

type Props = {
  election?: ElectionType;
};

function candidate({election}: Props){
  const [values, setValues] = useState([])
  const [options, setOptions] = useState()

  useEffect(() => {
    fetch("http://localhost:3000/api/election/").then((data)=>data.json()).then((val)=>setValues(val))
  },[])

  console.log(values,"values")
  return (
    <>
     <div>{election?.name}</div>
      <div className="w-screen overflow-x-scroll text-red-500">
        <div className="w-max flex">
          
            {
               election?.candidates.map((candidate, index) =>
               <label key={index}>{candidate?.position?.name}</label>) 
               
            }

            
          <select onChange={(e)=>setOptions(e.target.value)}>
            {
              election?.candidates.map((candidate, index) =>
              <option key={candidate?.id}>{candidate?.name}</option>)
            }
          </select>
          <div>
            <h1>{options}</h1>
          </div>
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