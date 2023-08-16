import React, { useState, useEffect } from "react";
import { prisma } from "@/utils/connect";
import { GetServerSideProps } from "next";
import { ElectionType } from "@/types/types";

type Props = {
  election?: ElectionType;
};

function candidate({ election }: Props) {
  const [positions, setPositions] = useState([]);
  const [selected, setSelected] = useState("");
  const [candidateList, setCandidateList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/election/")
      .then((data) => data.json())
      .then((val) => {
        const selectedVal = val.find((item) => item.name === election?.name);
        console.log(selectedVal?.candidates);
        setCandidateList(selectedVal?.candidates);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/position/")
      .then((data) => data.json())
      .then((val) => {
        // console.log(val)
        setPositions(val);
        setSelected(val[0]?.name);
      });
  }, []);

  return (
    <>
      <h2>{election?.name}</h2>
      <div className="w-screen overflow-x-scroll text-red-500">
        <div className="w-max flex">
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {positions?.map((opt) => (
              <option key={opt?.name}>{opt?.name}</option>
            ))}
          </select>
          <div>
            {selected &&
              candidateList?.map(
                (item) =>
                  item.position.name === selected && (
                    <div key={item?.id}>{item?.name}</div>
                  )
              )}
          </div>
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
