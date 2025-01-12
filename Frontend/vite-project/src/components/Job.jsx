import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="p-6 rounded-xl shadow-lg bg-white border border-gray-100 hover:shadow-2xl transition-all duration-300">
      {/* Top Section */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button
          variant="ghost"
          className="rounded-full text-gray-400 hover:text-[#4A90E2] transition"
          size="icon"
        >
          <Bookmark />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-gray-100 p-2 rounded-full">
          <Avatar>
            <AvatarImage src={job?.company?.logo} alt="Company Logo" />
          </Avatar>
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-800">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">USA</p>
        </div>
      </div>

      {/* Job Details */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-900 mb-2">{job?.title}</h1>
        <p className="text-sm text-gray-600 leading-relaxed">{job?.description}</p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Badge className="text-[#4A90E2] font-semibold bg-blue-100 px-3 py-1 rounded-lg">
          {job?.position} positions
        </Badge>
        <Badge className="text-[#FF5722] font-semibold bg-orange-100 px-3 py-1 rounded-lg">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-semibold bg-purple-100 px-3 py-1 rounded-lg">
          ${job?.salary}
        </Badge>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="px-4 py-2 border-gray-300 hover:bg-gray-100"
        >
          Details
        </Button>
        <Button className="px-4 py-2 bg-[#4A90E2] text-white rounded-lg hover:bg-[#357ABD] transition">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
