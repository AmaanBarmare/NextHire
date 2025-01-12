import React, { useEffect, useState } from "react";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  
  const {allAdminJobs, searchJobByText} = useSelector(store=>store.job)
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs =
    allAdminJobs.length >= 0 &&
    allAdminJobs.filter((job) => {
        if (!searchJobByText) {
          return true;
        }
        return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
      });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="p-6">
      {/* Table */}
      <Table className="border rounded-md shadow-lg">
        <TableCaption>A list of your recent posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.length > 0 ? (
            filterJobs.map((job) => (
              <TableRow
                key={job._id}
                className="hover:bg-gray-100 transition-all"
              >
                
                <TableCell className="font-medium">{job?.company?.name}</TableCell>
                <TableCell className="font-medium">{job?.title}</TableCell>
                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger className="p-2 rounded-full hover:bg-accent">
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 rounded-md border border-gray-300 bg-white p-2 shadow-md">
                      <div
                        onClick={() => navigate(`/admin/jobs/edit/${job?._id}`)}
                        className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-200 rounded-md"
                      >
                        <Edit2 className="w-4 text-gray-700" />
                        <span>Edit</span>
                      </div>
                      <div onClick={()=> navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center w-fit gap-2 cursor-pointer mt-2 hover:bg-gray-200 rounded-md">
                        <Eye className="w-4"/>
                        <span>Applicants</span> 
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6">
                <span className="text-gray-500">
                  No companies found. Try adjusting your filter.
                </span>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
