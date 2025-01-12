import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "Fullstack Developer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="bg-[#F9FAFB] py-10">
      <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Explore Categories
      </h2>
      <Carousel className="w-full max-w-4xl mx-auto">
        <CarouselContent className="flex gap-4">
          {categories.map((category, index) => (
            <CarouselItem
              key={index}
              className="flex justify-center items-center"
            >
              <Button
                onClick={() => searchJobHandler(category)}
                className="bg-[#4A90E2] hover:bg-[#357ABD] text-white px-6 py-3 rounded-full shadow-lg transition-all"
              >
                {category}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-[#4A90E2] hover:text-[#357ABD]">
          &#8592;
        </CarouselPrevious>
        <CarouselNext className="text-[#4A90E2] hover:text-[#357ABD]">
          &#8594;
        </CarouselNext>
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
