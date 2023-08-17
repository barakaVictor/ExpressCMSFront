import Link from "next/link";
import React from "react";
import { VotingType } from "@/types/types";

const getData = async ()=>{
  const res = await fetch("http://localhost:3000/api/election",{
    cache:"no-store"
  })

  if(!res.ok){
    throw new Error("Failed!");
    
  }

  return res.json()
}

const votingPage = async () => {

  const voting:VotingType = await getData()
  return (
    <div className="p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col md:flex-row items-center">
      {voting.map((election) => (
        <Link
          href={`/voting/${election.slug}`}
          key={election.id}
          className="w-full h-1/3 bg-cover p-8 md:h-1/2"
          style={{ backgroundImage: `url(${election.img})` }}
        >
          <div className={`text-${election.color} w-1/2`}>
            <h1 className="uppercase font-bold text-3xl">{election.name}</h1>
            <p className="text-sm my-8">{election.facultyId}</p>
            <Link href="/candidates/[id]" as={`/candidates/${election.id}`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">View</button>
            </Link>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default votingPage;