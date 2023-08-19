"use client"
import React, {useState, useEffect} from "react";
import { ElectionType } from "@/types/types";
import Image from "next/image";
import { useSession } from "next-auth/react";

function Candidate({ params }: { params: { id: Number } }) {

  const session = useSession()
  const [election, setElection] = useState<ElectionType | null>(null);
  const [vote, setVote] = useState<any>({
    positions: [],
    voterInformation: {},
    electionInformation: {}
  })
  const id = params.id
  useEffect(() => {
    // Fetch data when the component is mounted
    if(id){
      fetch(`http://localhost:3000/api/election/?id=${id}`)
        .then(response => response.json())
        .then(data => setElection(data))
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [id]);

  const handleChange = (voteInfo: any) => {
    setVote({
      ...vote,
      positions: 
      vote.positions.length <= 0
      ? [
          {
            id:voteInfo.position.id,
            name: voteInfo.position.name,
            candidate: voteInfo.candidate
          }
        ]
      : vote.positions.map((position: any) => {
        if(position.id == voteInfo.position.id){
          return {
            ...position,
            id: position.id,
            name: position.name,
            candidate: voteInfo.candidate
          }
        }
        return position
      }),
      voterInformation: {
        ...session.data?.user
      },
      electionInformation: {
        id: election?.id,
        name: election?.name
      }
    })
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    const JSONdata = JSON.stringify(vote)
 
    // API endpoint where we send form data.
    const endpoint = '/api/vote'
 
    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: 'POST',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    }
 
    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options)
 
    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json()
    fetch(`http://localhost:3000/api/election/?id=${id}`)
        .then(response => response.json())
        .then(data => setElection(data))
        .catch(error => console.error('Error fetching data:', error));
  };

  return (
    <div className="container mx-auto">
      <h2>{election?.name}</h2>
      <div className="text-red-500">
          <form onSubmit={handleSubmit}>
            {election?.positions.map((pos) => (
              <div key={pos?.id} className="py-4">
                <h3 className="text-2xl">{pos?.name}</h3>
                <div className="grid grid-cols-5 gap-7">
                  {pos.candidates.length> 0 ? 
                  pos.candidates?.map(
                    (item) =>
                      (
                        <div key={item?.id}>
                          <div className="h-96 w-full relative">
                            <Image
                                src={`/${item?.imageUrl}`} // Route of the image file
                                fill={true}
                                alt={item?.name}
                              />
                          </div>
                          <div className="px-2 text-center">
                            <h4>Votes: {item?.votes}</h4>
                            <div className="flex items-center mb-4">
                              <input
                                type="radio"
                                id={item?.id}
                                name={pos.name}
                                value={item?.name}
                                onChange={() => handleChange({position: pos, candidate: item})}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label 
                              htmlFor={item?.id}
                              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                <b>{item?.name}</b> 
                              </label>
                              </div>
                          </div>
                        </div>
                      )
                  )
                  : <b>No candidates vied for this position</b>
                }
                </div>
              </div>
            ))}

            <button type="submit" className="rounded-full border-current bg-sky-600 p-4 text-white">Submit</button>
          </form>
      </div>
    </div>
  );
}

export default Candidate;
