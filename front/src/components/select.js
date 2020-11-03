import React from "react";
import SelectBox from "./selectbox";

const Select = () => {
  return (
    <>
      <SelectBox name="カラー診断" path="/color" />
      <SelectBox name="メイクモード" path="/video" />
    </>
  );
};

export default Select;
