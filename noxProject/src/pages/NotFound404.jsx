import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound404() {
  const navigate = useNavigate();

  return (
    <div class="pt-120 pb-120 items-center justify-center text-center">
      <p className="text-3xl">NotFound404</p>
      <button
        className="pt-5 hover:underline text-xl"
        onClick={() => navigate("/")}
      >
        Go to Home Page
      </button>
    </div>
  );
}

export default NotFound404;
