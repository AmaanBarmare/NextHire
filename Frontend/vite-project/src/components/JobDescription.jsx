import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { FaMapMarkerAlt, FaBriefcase, FaMoneyBillWave, FaCalendarAlt, FaUsers } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  
  const params = useParams()
  const jobId = params.id
  const {singleJob} = useSelector(store=>store.job)
  const {user} = useSelector(store=>store.auth)
  const isInitiallyApplied = singleJob?.applications?.some(application=>application.applicant == user?._id) || false
  const [isApplied, setIsApplied] = useState(isInitiallyApplied)
  const dispatch = useDispatch()

  const applyJobHandler = async () => {
    try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`,{withCredentials:true})
        if(res.data.success){
            setIsApplied(true)
            const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
            dispatch(setSingleJob(updatedSingleJob))
            toast.success(res.data.message)
        }
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
    }
  }
  
  useEffect(()=>{
    const fetchSingleJob = async() => {
        try {
            const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true})
            console.log(res.data)
            if(res.data.success){
                dispatch(setSingleJob(res.data.job))
                setIsApplied(res.data.job.applications.some(application=>application.applicant == user?._id))
            }
        } catch (error) {
            console.log(error)
        }
    }
    fetchSingleJob()
  },[jobId, dispatch, user?._id])

  return (
    <div className="max-w-7xl mx-auto my-10 bg-gray-50 p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-bold text-2xl text-gray-800">{singleJob?.title}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <Badge className="text-blue-700 font-bold bg-blue-100 px-3 py-1 rounded-md">
              {singleJob?.position} Positions
            </Badge>
            <Badge className="text-red-700 font-bold bg-red-100 px-3 py-1 rounded-md">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-purple-700 font-bold bg-purple-100 px-3 py-1 rounded-md">
              ${singleJob?.salary}
            </Badge>
          </div>
        </div>
        <Button
            onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg px-5 py-2 font-medium ${
            isApplied
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-purple-700 text-white hover:bg-purple-600"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mb-4">Job Details</h2>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FaBriefcase className="text-gray-600" />
          <p className="font-bold">
            Role: <span className="font-normal text-gray-700">{singleJob?.title}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-gray-600" />
          <p className="font-bold">
            Location: <span className="font-normal text-gray-700">{singleJob?.location}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p className="font-bold">
            Description:{" "}
            <span className="font-normal text-gray-700">
              {singleJob?.description}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <FaUsers className="text-gray-600" />
          <p className="font-bold">
            Experience: <span className="font-normal text-gray-700">{singleJob?.experience} years</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <FaMoneyBillWave className="text-gray-600" />
          <p className="font-bold">
            Salary: <span className="font-normal text-gray-700">${singleJob?.salary}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <FaUsers className="text-gray-600" />
          <p className="font-bold">
            Total Applicants: <span className="font-normal text-gray-700">{singleJob?.applications?.length}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-gray-600" />
          <p className="font-bold">
            Posted Date: <span className="font-normal text-gray-700">{singleJob?.createdAt.split("T")[0]}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
