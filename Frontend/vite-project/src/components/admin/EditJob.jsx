import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

const EditJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          const job = res.data.job;
          setInput({
            title: job.title || "",
            description: job.description || "",
            requirements: job.requirements || "",
            salary: job.salary || "",
            location: job.location || "",
            jobType: job.jobType || "",
            experience: job.experience || "",
            position: job.position || 0,
          });
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch job details.");
      }
    };
    fetchJob();
  }, [id]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(`${JOB_API_END_POINT}/update/${id}`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success("Job updated successfully!");
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto my-10 bg-white shadow-lg rounded-lg p-8">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={() => navigate("/admin/jobs")}
            variant="outline"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft />
            <span>Back</span>
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">Edit Job</h1>
        </div>

        <form onSubmit={submitHandler}>
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
              Update Job
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditJob;
