import React, { useState } from "react";
import "antd/dist/antd.css";
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from "antd";

const originData = [];

for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: `Avarile$[i]`,
    age: 38,
    address: `Melbourne Point Cook no. ${i}`,
  });
}

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = (inputType: string) => {
    if (inputType === "number") {
      return <InputNumber />;
    } else return <Input />;
  };

  return (
    <td {...restProps}>
      {
        editing ? (
          <Form.Item
            name={dataIndex}
            style={{margin:0}}
            rules={[
              required: true,
              message: `Please Input ${title}`
            ]}
        )
    </td>
  )
};

const WareHousingMel = () => {
  return (
    <>
      <p></p>
    </>
  );
};

export default WareHousingMel;

