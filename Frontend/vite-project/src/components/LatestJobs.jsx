import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="bg-[#F9FAFB] py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
          <span className="text-[#4A90E2]">Latest & Top</span> Job Openings
        </h1>

        {/* Job Listings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allJobs.length <= 0 ? (
            <span className="text-gray-600 text-center col-span-full">
              No Job Available
            </span>
          ) : (
            allJobs?.slice(0, 6).map((job) => (
              <LatestJobCards key={job._id} job={job} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestJobs;
