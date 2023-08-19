export type VotingType = {
    id: string;
    slug: string;
    name: string;
    facultyId?: string;
    faculty?: FacultyType;
    img?: string;
    color: string;
} [];

export type ElectionType = {
    id: string;
    name: string;
    candidates: CandidateType[];
    positions: ElectivePosition[];
};

export type FacultyType = {
    id: string;
    name: string;
};

export type CandidateType = {
    id: string;
    name: string;
    imageUrl: string;
    facultyId?: string;
    img?: string;
    color: string;
    positions: ElectivePosition;
    votes: BigInteger;
};

export type ElectivePosition = {
    id: string;
    name: string;
    candidates: CandidateType[];
    elections: string;
    votes: string;
}
