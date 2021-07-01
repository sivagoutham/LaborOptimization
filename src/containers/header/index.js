import React, { useEffect } from "react";
import { BsFillPersonFill,BsInfoCircleFill } from "react-icons/bs";
import Logo from '../../assets/download.png';
function LoggedHeader() {
  // useEffect(() => {
    
  // }, []);
  return (
    <header className="page-header">
      <div className="headerMenu">
        <div className="header-container container">
          <div className="header-topbar">
            <a className="header-logo ">
              <img src={Logo} alt="Cardinal Health" width="140px" height="75px" style={{borderRadius:"10px"}}/>
            </a>
          </div>
          <div className="header-Info">
          <p className="text-center pt-3">
            <BsInfoCircleFill/>
            Floor manager will have to make sure they are submitting this data
            before start of work in that hour bucket
          </p>
          </div>
          {/* <nav className="header-nav">
            <a href="/" style={{ color: "white", textDecoration: "none" }}>
              <BsFillPersonFill /> LOGOUT
            </a>
          </nav> */}
        </div>
      </div>
    </header>
  );
}

export default LoggedHeader;
