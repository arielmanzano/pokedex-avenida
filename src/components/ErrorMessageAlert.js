import React from "react";
import "./ErrorMessageAlert.css";

export const ErrorMessageAlert = (props) => {
  return (
    <div className="ErrorMessageAlert">
      <strong>Error</strong> - {props.message}
    </div>
  );
};
