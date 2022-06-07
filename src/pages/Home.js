import React from "react";
import Loader from "../components/Loader";
import { useMainContextProvider } from "../contexts/MainContext";

const Home = () => {
  const { residentData, userData, fetchingResidentDetails, fetchingUserData } =
    useMainContextProvider();

  return (
    <div>
      <form className="">
        <input placeholder="Search ID" />
        <button>Search</button>
      </form>
      <div className="d-flx-col details">
        <h3>User Data</h3>
        {userData && !fetchingUserData ? (
          <> {`${userData.firstName} ${userData.lastName}`} </>
        ) : (
          <Loader />
        )}
      </div>
      <div className="d-flx-col details">
        <h3>Resident Data</h3>
        {residentData && !fetchingResidentDetails ? (
          <div className="d-flx-col">
            <span className="d-flx-col mt-2">
              <strong>Address</strong> {residentData.address}
            </span>
            <span className="d-flx-col mt-2">
              <strong>Energy Usage</strong> {residentData.energy}
            </span>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Home;
