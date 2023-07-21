import React from "react";
import { useNavigate } from "react-router";

export default function ErrorPage() {
  const navigate = useNavigate();
  const goHome = () => navigate("/");
  return (
    // <>
    //   <h1>Page introuvable</h1>
    //   <h2>404</h2>
    // </>
    <body className="h-screen overflow-hidden flex items-center justify-center">
      <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
        <h1 className="text-9xl font-extrabold text-white tracking-widest">
          404
        </h1>
        <div className="bg-[#EC5D5C] px-2 text-sm rounded rotate-12 absolute">
          Page Not Found
        </div>
        <button className="mt-5" onClick={goHome}>
          <div className="relative inline-block text-sm font-medium text-[#EC5D5C] group active:text-orange-500 focus:outline-none focus:ring">
            <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#EC5D5C] group-hover:translate-y-0 group-hover:translate-x-0"></span>

            <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">Retourner à l'accueil</span>
          </div>
        </button>
      </main>
    </body>
  );
}
