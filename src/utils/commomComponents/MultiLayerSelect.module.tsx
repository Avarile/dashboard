import React from "react";
import { Select } from "antd";
import { type } from "os";

enum EnumTypes {
  Type1 = "Type1",
  Type2 = "Type2",
}

// enum EnumProductTypes {
//   Product1 = "Product1",
//   Product2 = "Product2",
// }

type O = Record<string, string[]>;

const { Option } = Select;
const productTypes = ["Type1", "Type2"];
const products: O = {
  Type1: ["Product1", "Product2", "Product3"],
  Type2: ["Product4", "Product5", "Product6"],
};

const MultiLayerSelect = () => {
  const [type, setType] = React.useState(products[productTypes[0]]);
  const [product, setProduct] = React.useState(products[productTypes[0]][0]);

  const handleTypeChange = (value: string) => {
    setType(products[value]);
    setProduct(products[value][0]);
  };

  const handleProductChange = (value: any) => {
    setProduct(value);
  };

  return (
    <>
      <Select defaultValue={productTypes[0]} style={{ width: 120 }} onChange={(value: string) => handleTypeChange(value)}>
        {productTypes.map((type) => (
          <Option key={type}>{type}</Option>
        ))}
      </Select>
      <Select
        style={{ width: 120 }}
        value={product}
        onChange={(value) => {
          handleProductChange(value);
        }}>
        {type.map((product: any) => (
          <Option key={product}>{product}</Option>
        ))}
      </Select>
    </>
  );
};

export default MultiLayerSelect;
