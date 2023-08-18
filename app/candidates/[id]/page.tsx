"use client"
import React, {useState, useEffect} from "react";
import { ElectionType } from "@/types/types";
import Image from "next/image";

function Candidate({ params }: { params: { id: Number } }) {

  const [election, setElection] = useState<ElectionType | null>(null);
  const [vote, setVote] = useState({})
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

  const handleChange = (event: any) => {
    setVote({
      ...vote,
      [event.target.name]: event.target.value
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
    alert(`${JSON.stringify(result.data)}`)

  };

  return (
    <>
      <h2>{election?.name}</h2>
      <div className="w-screen overflow-x-scroll text-red-500">
        <div className="w-max flex">
          <form onSubmit={handleSubmit}>
            {election?.positions.map((pos) => (
              <div key={pos?.id}>
                <h3>{pos?.name}</h3>
                {pos.candidates?.map(
                  (item) =>
                    (
                      <div key={item?.id}>
                        <input
                          type="radio"
                          id={item?.id}
                          name={pos.name}
                          value={item?.name}
                          onChange={handleChange}
                        />
                        <label htmlFor={item?.id}>
                          {item?.name}
                          <Image
                            src={`/${item?.imageUrl}`} // Route of the image file
                            height={144} // Desired size with correct aspect ratio
                            width={144} // Desired size with correct aspect ratio
                            alt={item?.name}
                          />
                        </label>
                        <br></br>
                      </div>
                    )
                )}
              </div>
            ))}

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

/*export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  let election = null;
  if (id) {
    election = await prisma.election.findUnique({
      where: {
        id: Number(id[0]),
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
  }
  return {
    props: {
      election: election
        ? {
            id: election.id,
            name: election.name,
            positions: election.positions.map((position) => {
              return {
                id: position.id,
                name: position.name,
                candidates: position.candidates.map((candidate) => {
                  return {
                    id: candidate.id,
                    name: candidate.name,
                    votes: candidate._count.votes
                  }
                })
              };
            }),
          }
        : null,
    },
  };
};*/

export default Candidate;
