import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-6 rounded-lg shadow-md bg-white border border-gray-200 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg"
    >
      {/* Company Name */}
      <div>
        <h1 className="font-semibold text-xl text-gray-900">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">USA</p>
      </div>

      {/* Job Title and Description */}
      <div className="mt-4">
        <h1 className="font-bold text-lg text-[#4A90E2]">{job?.title}</h1>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-3 mt-5">
        <Badge className="bg-[#E3F2FD] text-[#4A90E2] font-bold px-3 py-1 rounded-full">
          {job?.position} positions
        </Badge>
        <Badge className="bg-[#FFEBEE] text-[#FF5722] font-bold px-3 py-1 rounded-full">
          {job?.jobType}
        </Badge>
        <Badge className="bg-[#EDE7F6] text-[#6A38C2] font-bold px-3 py-1 rounded-full">
          ${job?.salary}
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
