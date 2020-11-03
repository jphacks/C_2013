import React from "react";
import SelectBox from "./selectbox";

const Select = () => {
  return (
    <>
      <SelectBox name="セルフモード" path="/eyebrow_template" />
      <SelectBox name="メイクモード" path="/video" />
      <SelectBox name="カラー診断" path="/color" />
    </>
  );
};

export default Select;
