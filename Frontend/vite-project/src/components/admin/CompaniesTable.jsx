import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="p-6">
      {/* Table */}
      <Table className="border rounded-md shadow-lg">
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.length > 0 ? (
            filterCompany.map((company) => (
              <TableRow
                key={company._id}
                className="hover:bg-gray-100 transition-all"
              >
                <TableCell className="flex items-center gap-4">
                  <Avatar className="w-16 h-16 bg-gray-100">
                    <AvatarImage
                      src={company.logo || ""}
                      alt="Company Logo"
                      className="object-contain"
                    />
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{company.name}</TableCell>
                <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger className="p-2 rounded-full hover:bg-accent">
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 rounded-md border border-gray-300 bg-white p-2 shadow-md">
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                        className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-200 rounded-md"
                      >
                        <Edit2 className="w-4 text-gray-700" />
                        <span>Edit</span>
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

export default CompaniesTable;
