import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import axios from "axios";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
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
          className="w-full max-w-xl border border-gray-200 rounded-lg p-8 bg-white shadow-lg my-10"
        >
          {/* Title */}
          <h1 className="font-extrabold text-3xl text-center text-[#4A90E2] mb-6">
            Login
          </h1>

          {/* Email Input */}
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

          {/* Password Input */}
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

          {/* Login Button */}
          {loading ? (
            <Button className="w-full bg-[#4A90E2] text-white py-3 px-4 rounded-lg">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-[#4A90E2] text-white py-3 px-4 rounded-lg hover:bg-[#357ABD] transition-all"
            >
              Login
            </Button>
          )}

          {/* Signup Link */}
          <div className="text-center mt-6">
            <span className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#4A90E2] font-semibold">
                Signup
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
