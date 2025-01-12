import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="bg-[#F9FAFB] text-center py-16 px-4 md:px-8 lg:px-16">
      <div className="flex flex-col gap-5 my-10 max-w-4xl mx-auto">
        {/* Tagline */}
        <span className="mx-auto px-4 py-2 rounded-full bg-[#4A90E2] text-white font-medium text-sm">
          No.1 Job Hunt Website
        </span>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
          Search, Apply & <br />
          Get Your{" "}
          <span className="text-[#4A90E2]">Dream Jobs</span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 text-sm md:text-base">
          Explore a wide variety of career opportunities tailored to your goals. Find jobs, apply easily, and get hired faster than ever before.
        </p>

        {/* Search Bar */}
        <div className="flex w-full md:w-[60%] lg:w-[50%] shadow-md border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto bg-white">
          <input
            type="text"
            placeholder="Find your dream jobs"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full bg-white text-gray-800 px-4 py-2 rounded-full text-sm md:text-base"
          />
          <Button
            onClick={searchJobHandler}
            className="bg-[#4A90E2] hover:bg-[#357ABD] text-white px-5 py-2 rounded-full shadow-md"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>

      
    </div>
  );
};

export default HeroSection;
