import React from "react";
import BdCrum from "../PageHeader/BdCrum";

export default function SearchResultBar({ pageName, searchFor }) {
  return (
    <div className="section_padding searchbar">
      <div className="main_container ">
        <div className=" searchbar">
          <div className="searchtitle">
            <h2 className="primary_title">
              <span> {pageName}</span> {searchFor.title}
            </h2>
          </div>

          <div className="searchbdcum">
            <BdCrum pageName={pageName} />
            <span className="primary_text">{searchFor.title}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
