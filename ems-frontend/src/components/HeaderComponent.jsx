import React from "react";

const HeaderComponent = () => {
  return (
    <>
      <style>
        {`
          .navbar-glass {
            background: rgba(15, 23, 42, 0.9);
            backdrop-filter: blur(14px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            animation: navbarFade 0.6s ease-out;
          }

          @keyframes navbarFade {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .navbar-brand {
            letter-spacing: 0.08em;
            transition: color 0.3s ease;
          }

          .navbar-brand:hover {
            color: #60a5fa;
          }
        `}
      </style>

      <header>
        <nav className="navbar navbar-expand-lg navbar-dark navbar-glass shadow-sm px-4">
          <div className="container-fluid">
            <span className="navbar-brand fw-semibold">
              Employee Management System
            </span>
          </div>
        </nav>
      </header>
    </>
  );
};

export default HeaderComponent;
