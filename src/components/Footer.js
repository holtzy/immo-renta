import { Link } from "gatsby";
import React from "react";
import "./footer.css";
import SocialMediaButtons from "./SocialMediaButtons";

export default function Footer() {
  return (
    <div className="footer">
      <div className="copyright">Copyright © react-immo 2021</div>
      <SocialMediaButtons />
      <div className="policy">
        <span>
          <Link to="/about">
            About
          </Link>
          <span> | </span>
          <a href="https://github.com/holtzy/The-Python-Graph-Gallery/blob/master/LICENSE">
            License
          </a>
        </span>
      </div>
    </div>
  );
}
