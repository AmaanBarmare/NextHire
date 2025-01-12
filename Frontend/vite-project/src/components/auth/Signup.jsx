import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import axios from "axios";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-[70vh] max-w-7xl mx-auto px-4">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-lg border border-gray-200 rounded-lg p-8 bg-white shadow-lg my-10"
        >
          {/* Title */}
          <h1 className="font-extrabold text-3xl text-center text-[#4A90E2] mb-6">
            Sign Up
          </h1>

          {/* Full Name */}
          <div className="my-4">
            <Label className="font-medium">Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              className="border border-gray-300 rounded-lg px-4 py-3 mt-1 w-full"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div className="my-4">
            <Label className="font-medium">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              className="border border-gray-300 rounded-lg px-4 py-3 mt-1 w-full"
              placeholder="Enter your email"
            />
          </div>

          {/* Phone Number */}
          <div className="my-4">
            <Label className="font-medium">Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              className="border border-gray-300 rounded-lg px-4 py-3 mt-1 w-full"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Password */}
          <div className="my-4">
            <Label className="font-medium">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              className="border border-gray-300 rounded-lg px-4 py-3 mt-1 w-full"
              placeholder="Enter your password"
            />
          </div>

          {/* Role Selection */}
          <div className="my-4">
            <Label className="font-semibold">Select Role</Label>
            <RadioGroup
              value={input.role}
              onValueChange={(value) => setInput({ ...input, role: value })}
              className="flex items-center gap-6 mt-2"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value="student"
                  id="student"
                  className="h-5 w-5 border-2 border-gray-300 rounded-full bg-white data-[state=checked]:bg-[#4A90E2] data-[state=checked]:border-[#4A90E2]"
                />
                <Label htmlFor="student" className="text-sm text-gray-600">
                  Student
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value="recruiter"
                  id="recruiter"
                  className="h-5 w-5 border-2 border-gray-300 rounded-full bg-white data-[state=checked]:bg-[#FF5722] data-[state=checked]:border-[#FF5722]"
                />
                <Label htmlFor="recruiter" className="text-sm text-gray-600">
                  Recruiter
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Profile Upload */}
          <div className="my-4">
            <Label className="font-medium">Profile Picture</Label>
            <Input
              accept="image/*"
              type="file"
              onChange={changeFileHandler}
              className="cursor-pointer border border-gray-300 rounded-lg px-4 py-3 mt-1 w-full"
            />
          </div>

          {/* Signup Button */}
          {loading ? (
            <Button className="w-full bg-[#4A90E2] text-white py-3 px-4 rounded-lg">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-[#4A90E2] text-white py-3 px-4 rounded-lg hover:bg-[#357ABD] transition-all"
            >
              Sign Up
            </Button>
          )}

          {/* Login Link */}
          <div className="text-center mt-6">
            <span className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-[#4A90E2] font-semibold">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
