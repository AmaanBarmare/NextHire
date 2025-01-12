import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOutIcon, User2Icon, MenuIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 md:px-8">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold cursor-pointer">
            Next<span className="text-[#4A90E2]">Hire</span>
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    className="text-[#4A90E2] hover:text-[#357ABD] transition font-semibold"
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    className="text-[#4A90E2] hover:text-[#357ABD] transition font-semibold"
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className="text-[#4A90E2] hover:text-[#357ABD] transition font-semibold"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className="text-[#4A90E2] hover:text-[#357ABD] transition font-semibold"
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/browse"
                    className="text-[#4A90E2] hover:text-[#357ABD] transition font-semibold"
                  >
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>
          {/* Auth Buttons */}
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#4A90E2] text-white hover:bg-[#357ABD]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt={user?.fullname || "User"}
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-72 bg-[#F9FAFB] border border-gray-200 shadow-md rounded-lg">
                <div className="flex items-center gap-4 p-4">
                  <Avatar>
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt={user?.fullname || "User"}
                      className="bg-gray-300"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {user?.fullname}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {user?.profile?.bio || "Welcome to NextHire"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col space-y-1 px-4 py-2">
                  {user.role === "student" && (
                    <Button
                      variant="link"
                      className="text-[#4A90E2] hover:underline flex items-center gap-2 bg-transparent"
                    >
                      <User2Icon className="h-4 w-4" />
                      <Link to="/profile">View Profile</Link>
                    </Button>
                  )}
                  <Button
                    onClick={logoutHandler}
                    variant="link"
                    className="text-[#E53935] hover:underline flex items-center gap-2 bg-transparent"
                  >
                    <LogOutIcon className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            className="p-2"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <MenuIcon />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <ul className="flex flex-col p-4 gap-3">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    className="block text-gray-700 hover:text-[#FF5722]"
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    className="block text-gray-700 hover:text-[#FF5722]"
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className="block text-gray-700 hover:text-[#4A90E2]"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className="block text-gray-700 hover:text-[#4A90E2]"
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/browse"
                    className="block text-gray-700 hover:text-[#4A90E2]"
                  >
                    Browse
                  </Link>
                </li>
              </>
            )}
            {!user ? (
              <>
                <li>
                  <Link
                    to="/login"
                    className="block text-gray-700 hover:text-[#FF5722]"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="block text-gray-700 hover:text-[#FF5722]"
                  >
                    Signup
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Button
                  onClick={logoutHandler}
                  variant="link"
                  className="block w-full text-black hover:underline"
                >
                  <LogOutIcon />
                  Logout
                </Button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
