import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

//const skills = ["HTML", "CSS", "JavaScript", "React.js"];
const isResume = true;

const Profile = () => {
  useGetAppliedJobs()
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white shadow-lg border border-gray-200 rounded-xl mt-8 p-6">
        {/* Profile Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
            </Avatar>
            <div>
              <h1 className="font-bold text-2xl text-gray-800">
                {user?.fullname}
              </h1>
              <p className="text-gray-600">{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="flex items-center gap-2 text-gray-600 border-gray-300 hover:border-gray-400"
          >
            <Pen className="w-4 h-4" />
            Edit
          </Button>
        </div>

        {/* Contact Information */}
        <div className="mt-6">
          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="text-blue-600" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700 mt-3">
            <Contact className="text-green-600" />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-6">
          <h2 className="font-semibold text-gray-800">Skills</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 cursor-pointer"
                >
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-gray-600">NA</span>
            )}
          </div>
        </div>

        {/* Resume Section */}
        <div className="mt-6">
          <Label className="text-md font-bold text-gray-800 block">Resume</Label>
          {user?.profile?.resume ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={user?.profile?.resume.replace(
                "/image/upload/",
                "/image/upload/f_auto,q_auto/"
              )} // Dynamically generate optimized URL
              className="text-blue-500 hover:underline"
            >
              {user?.profile?.resumeOriginalName || "View Resume"}
            </a>
          ) : (
            <span className="text-gray-600">No resume uploaded</span>
          )}
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg border border-gray-200 rounded-xl mt-8 p-6">
        <h2 className="font-bold text-lg text-gray-800">Applied Jobs</h2>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
