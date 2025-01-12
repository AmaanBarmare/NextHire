import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create the company.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-16 bg-white shadow-lg rounded-lg p-8 sm:px-10 lg:mt-20">
        <div className="mb-8 text-center">
          <h1 className="font-extrabold text-3xl md:text-4xl text-gray-800">
            Let's Get Started
          </h1>
          <p className="text-gray-600 mt-2 md:text-lg">
            Create your company's profile by entering its name. This will help
            you manage job postings, applications, and more effectively.
          </p>
        </div>
        <div className="mb-6">
          <Label className="text-lg font-semibold text-gray-800">
            Company Name
          </Label>
          <Input
            type="text"
            className="mt-2 text-gray-800 bg-gray-50 border-gray-300 rounded-lg"
            placeholder="JobHunt, Microsoft, etc."
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div className="flex justify-center gap-4 mt-8">
          <Button
            variant="outline"
            className="w-32 border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-800"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button
            className="w-32 bg-[#4A90E2] text-white hover:bg-[#357ABD] rounded-lg"
            onClick={registerNewCompany}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
