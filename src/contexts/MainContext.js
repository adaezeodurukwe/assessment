import React, { createContext, useContext, useEffect, useState } from "react";
import Axios from "axios";
export const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  const [fetchingUserData, setFetchingUserData] = useState(false);
  const [fetchingResidentDetails, setFetchingResidentDetails] = useState(false);
  const [residentData, setResidentData] = useState(null);
  const [userData, setUserData] = useState(null);
  const headers = { Authorization: `Bearer ${process.env.REACT_APP_TOKEN}` };

  useEffect(() => {
    getUserData();
    getResidentData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserData = async () => {
    try {
      setFetchingUserData(true);

      const res = await Axios.get(
        `${process.env.REACT_APP_BASE_URL}/users/me`,
        { headers }
      );

      const { first_name: firstName, last_name: lastName } =
        res.data.data.attributes;

      setUserData({ firstName, lastName });
      setFetchingUserData(false);
    } catch (error) {
      setFetchingUserData(false);
      console.log(error.message);
    }
  };

  const getResidentData = async () => {
    try {
      setFetchingResidentDetails(true)
      const res = await Axios.get(
        `${process.env.REACT_APP_BASE_URL}/households/10`,
        { headers }
      );

      const { address_1: address, usage_data } = res.data.data.attributes;
      const { gen_usage_today, grid_usage_today } = usage_data;

      setResidentData({ address, energy: gen_usage_today + grid_usage_today });
      setFetchingResidentDetails(false)
    } catch (error) {
      setFetchingResidentDetails(false)
      console.log(error.message);
    }
  };

  return (
    <MainContext.Provider
      value={{
        residentData,
        userData,
        fetchingResidentDetails,
        fetchingUserData
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMainContextProvider = () => {
  const context = useContext(MainContext);
  return context;
};

export default MainContextProvider;
