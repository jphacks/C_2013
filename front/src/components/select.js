import React from "react";
import SelectBox from "./selectbox";

const Select = () => (
  <>
    <SelectBox name="セルフモード" path="/template/EYEBROW" />
    <SelectBox name="メイクモード" path="/video/EYEBROW" />
    <SelectBox name="カラー診断" path="/color" />
  </>
);

export default Select;
