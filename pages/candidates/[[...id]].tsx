import React, { useState, useEffect } from "react";
import { prisma } from "@/utils/connect";
import { GetServerSideProps } from "next";
import { ElectionType } from "@/types/types";

import Image from "next/image";

type Props = {
  election?: ElectionType;
};

function candidate({ election }: Props) {
  const [positions, setPositions] = useState([]);
  const [candidateList, setCandidateList] = useState([]);

  const handleSubmit = (event) => {
    const form = event.target;

    event.preventDefault();
    event.stopPropagation();

    const values = {
      President: form["President"]?.value || "",
      "Vice President": form["Vice President"]?.value || "",
      Secretary: form["Secretary"]?.value || "",
    };

    console.log(values);
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/election/")
      .then((data) => data.json())
      .then((val) => {
        const selectedVal = val.find((item) => item.name === election?.name);
        console.log(selectedVal?.candidates);
        setCandidateList(selectedVal?.candidates);
      });
  }, [election]);

  useEffect(() => {
    fetch("http://localhost:3000/api/position/")
      .then((data) => data.json())
      .then((val) => {
        // console.log(val)
        setPositions(val);
      });
  }, []);

  return (
    <>
      <h2>{election?.name}</h2>
      <div className="w-screen overflow-x-scroll text-red-500">
        <div className="w-max flex">
          <form onSubmit={handleSubmit}>
            {positions.map((pos) => (
              <div key={pos?.id}>
                <h3>{pos?.name}</h3>
                {candidateList?.map(
                  (item) =>
                    item.position.name === pos.name && (
                      <div key={item?.id}>
                        <input
                          type="radio"
                          id={item?.id}
                          name={pos.name}
                          value={item?.name}
                        />
                        <label htmlFor={item?.id}>
                          {item?.name}
                          <img
                            src={item?.imageUrl}
                            width={50}
                            height={50}
                            alt=""
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  let election = null;
  if (id) {
    election = await prisma.election.findUnique({
      where: {
        id: Number(id[0]),
      },
      include: {
        candidates: {
          include: {
            position: true,
          },
        },
      },
    });
  }
  return {
    props: {
      election: election
        ? {
            id: election.id,
            name: election.name,
            candidates: election.candidates.map((candidate) => {
              return {
                id: candidate.id,
                name: candidate.name,
                position: {
                  id: candidate.position.id,
                  name: candidate.position.name,
                },
              };
            }),
          }
        : null,
    },
  };
};

export default candidate;
