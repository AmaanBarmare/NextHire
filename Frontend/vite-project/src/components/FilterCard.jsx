import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const fitlerData = [
  {
    fitlerType: "Location",
    array: ["Pennsylvania", "New York", "Washington", "California", "Texas"],
  },
  {
    fitlerType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    fitlerType: "Salary",
    array: ["0-50,000", "50,000-100,000", "100,000+"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
    dispatch(setSearchedQuery(value));
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="bg-[#121212] text-white p-6 rounded-xl shadow-lg w-full md:w-80 lg:w-72">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-6 text-[#4A90E2]">Filter Jobs</h1>

      {/* Divider */}
      <hr className="border-gray-700 mb-6" />

      {/* Filters */}
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {fitlerData.map((data, index) => (
          <div key={index} className="mb-8">
            {/* Filter Type */}
            <h2 className="text-lg font-semibold mb-4 text-gray-300">
              {data.fitlerType}
            </h2>
            <div className="space-y-3">
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                return (
                  <div key={idx} className="flex items-center space-x-4">
                    {/* Radio Button */}
                    <RadioGroupItem
                      value={item}
                      id={itemId}
                      className="relative w-6 h-6 border-2 rounded-full bg-[#121212] border-gray-600 
                                 data-[state=checked]:bg-[#4A90E2] data-[state=checked]:border-[#4A90E2] focus:ring-[#4A90E2]"
                    >
                      <div className="absolute w-3 h-3 rounded-full bg-[#4A90E2] data-[state=unchecked]:hidden"></div>
                    </RadioGroupItem>

                    {/* Label */}
                    <Label
                      htmlFor={itemId}
                      className="cursor-pointer text-sm text-gray-400 hover:text-white"
                    >
                      {item}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
