import React from "react";
import { useSelector } from "react-redux";
import gifLoading from "../../../assets/loading.gif";
import "./LoadingComponent.css";

export default function LoadingComponent() {
  const  isLoading  = useSelector((state) => state.LoadingReducer.isLoading);

  if (isLoading) {
    return (
      <div className="bgLoading">
        <img src={gifLoading} alt="loading" />
      </div>
    );
  }else{
    return '';
  }
}
