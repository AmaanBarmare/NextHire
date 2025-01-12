import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#121212] text-white py-12">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">NextHire</h2>
            <p className="text-sm text-gray-400">
              NextHire is your trusted platform for finding and applying to your
              dream jobs. We connect you with top employers to kickstart your
              career journey.
            </p>
          </div>
          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <ul className="text-sm space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-[#4A90E2] transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/jobs"
                  className="text-gray-400 hover:text-[#4A90E2] transition"
                >
                  Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/browse"
                  className="text-gray-400 hover:text-[#4A90E2] transition"
                >
                  Browse
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            <p className="text-sm text-gray-400">Email: support@nexthire.com</p>
            <p className="text-sm text-gray-400">Phone: +1 234 567 890</p>
            
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-700" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} NextHire. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
