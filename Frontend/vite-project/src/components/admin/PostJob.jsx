import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto my-10 bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Add New Job
        </h1>
        <form onSubmit={submitHandler}>
          {companies.length > 0 && (
            <div className="mb-6">
              <Label className="font-medium text-gray-800 mb-2 block">
                Select a Company
              </Label>
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((company) => (
                      <SelectItem
                        key={company._id}
                        value={company?.name?.toLowerCase()}
                      >
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="font-medium text-gray-800">Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                placeholder="Enter job title"
                className="mt-2"
              />
            </div>
            <div>
              <Label className="font-medium text-gray-800">Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Enter job description"
                className="mt-2"
              />
            </div>
            <div>
              <Label className="font-medium text-gray-800">Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                placeholder="Enter job requirements"
                className="mt-2"
              />
            </div>
            <div>
              <Label className="font-medium text-gray-800">Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                placeholder="Enter job salary"
                className="mt-2"
              />
            </div>
            <div>
              <Label className="font-medium text-gray-800">Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="Enter job location"
                className="mt-2"
              />
            </div>
            <div>
              <Label className="font-medium text-gray-800">Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                placeholder="Enter job type"
                className="mt-2"
              />
            </div>
            <div>
              <Label className="font-medium text-gray-800">Experience Level</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                placeholder="Enter experience level"
                className="mt-2"
              />
            </div>
            <div>
              <Label className="font-medium text-gray-800">No. of Positions</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                placeholder="Enter number of positions"
                className="mt-2"
              />
            </div>
          </div>

          {loading ? (
            <Button className="w-full mt-8 flex justify-center items-center bg-[#4A90E2] text-white rounded-lg">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full mt-8 bg-[#4A90E2] text-white rounded-lg hover:bg-[#357ABD]"
            >
              Post New Job
            </Button>
          )}
          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center mt-4">
              *Please register a company first, before posting a job
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
