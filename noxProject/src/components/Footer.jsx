import React from "react";

function Footer() {
  return (
    <footer className="bg-black text-white py-8 px-8">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full md:w-1/2 md:text-left md:mb-0 mb-8">
          <p className="text-xs text-gray-1 md:text-sm">
            Copyright 2026 &copy; Nox Inc. All Rights Reserved
          </p>
        </div>

        <div className="w-full md:w-1/2 md:text-right md:mb-0 mb-8">
          <p className="text-xs md:text-sm text-gray-1">Turkey, Istanbul</p>
        </div>
      </div>
    </footer>



    // first try footer
    // <div>
    //   <footer>
    //     <p>&copy; 2026 MyWebsite. All rights reserved.</p>
    //   </footer>
    // </div>
  );
}

export default Footer;
