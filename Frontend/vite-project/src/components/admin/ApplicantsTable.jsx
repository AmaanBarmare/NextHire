import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';

const shortlistingStatus = ['Accepted', 'Rejected'];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="p-6">
      <Table className="border rounded-md shadow-md">
        <TableCaption>A list of recently applied users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants && applicants?.applications?.length > 0 ? (
            applicants.applications.map((item) => (
              <TableRow
                key={item._id}
                className="hover:bg-gray-100 transition-all"
              >
                <TableCell className="font-medium">
                  {item?.applicant?.fullname || 'N/A'}
                </TableCell>
                <TableCell>{item?.applicant?.email || 'N/A'}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber || 'N/A'}</TableCell>
                <TableCell>
                  {item.applicant?.profile?.resume ? (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={item?.applicant?.profile?.resume.replace(
                        "/image/upload/",
                        "/image/upload/f_auto,q_auto/"
                      )} // Dynamically generate optimized URL
                      className="text-blue-500 hover:underline"
                    >
                      {item?.applicant?.profile?.resumeOriginalName || 'View Resume'}
                    </a>
                  ) : (
                    <span className="text-gray-600">No resume uploaded</span>
                  )}
                </TableCell>
                <TableCell>
                  {item?.applicant?.createdAt.split('T')[0] || 'N/A'}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="p-2 rounded-full hover:bg-gray-200">
                      <MoreHorizontal className="h-4 w-4 text-gray-500" />
                    </PopoverTrigger>
                    <PopoverContent className="w-40 rounded-md border border-gray-300 bg-white shadow-md p-2">
                      {shortlistingStatus.map((status, index) => (
                        <div
                          key={index}
                          onClick={() => statusHandler(status, item?._id)}
                          className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 rounded-md"
                        >
                          <span
                            className={`text-sm ${
                              status === 'Accepted'
                                ? 'text-green-600'
                                : 'text-red-600'
                            }`}
                          >
                            {status}
                          </span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                <span className="text-gray-500">
                  No applicants found. Try adjusting your filter.
                </span>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
