import React from "react";
import { Form, Select, Input, FormInstance, DatePicker, Button, Space } from "antd";
import { logisticStatus, fabricationStatus, orderStatus } from "../productTypes";
import { ELogisticStatus, EfabricationStatus } from "../interfaces";

const { RangePicker } = DatePicker;
const { Search } = Input;

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

export default function FlatSelectModuleForOrderScreen({ getOrder }: { getOrder: Function }) {
  const [formInstance] = Form.useForm<FormInstance>();
  const onFinish = () => {
    let currentFormValue = formInstance.getFieldValue("searchParams");
    getOrder(currentFormValue);
  };
  const getDateRange = (value: any, dateRange: any) => {
    console.log(`Value: ${value}`, `dateRange: ${dateRange}`);
  };
  const DateRangeComfirm = (value: any) => {
    console.log(value);
  };

  return (
    <>
      <Form
        {...layout}
        name="flatSelection"
        style={{
          display: "flex",
          flexDirection: "row",
          // justifyContent: "flex-start",
          flexWrap: "wrap",
        }}
        onFinish={() => onFinish()}
        form={formInstance}>
        <Form.Item
          style={{
            width: "30rem",
            marginRight: "1rem",
          }}
          name={["searchParams", "logisticStatus"]}
          label="Logistic"
          rules={[
            {
              required: false,
            },
          ]}>
          <Select
            placeholder="Select"
            onChange={() => {
              console.log();
            }}>
            {logisticStatus.map((type: { id: number; name: string }) => {
              return (
                <Select.Option key={type.id} value={type.name}>
                  {type.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          style={{
            width: "30rem",
            marginRight: "1rem",
          }}
          name={["searchParams", "orderStatus"]}
          label="Payment"
          rules={[
            {
              required: false,
            },
          ]}>
          <Select
            placeholder="Select"
            onChange={() => {
              // console.log(ref.current?.getFieldValue("product").productType)
              // setLoadingStatus(false);
            }}>
            {orderStatus.map((type: { id: number; name: string }) => {
              return (
                <Select.Option key={type.id} value={type.name}>
                  {type.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="Fabrication" rules={[{ required: false }]} name={["searchParams", "fabricationStatus"]} style={{ width: "30rem", marginRight: "1rem" }}>
          <Select
            placeholder="Select"
            onChange={() => {
              // console.log(ref.current?.getFieldValue("product").productType)
              // setLoadingStatus(false);
            }}>
            {fabricationStatus.map((type: { id: number; name: string }) => {
              return (
                <Select.Option key={type.id} value={type.name}>
                  {type.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          style={{
            width: "30rem",
            marginRight: "1rem",
          }}
          name={["searchParams", "dateRange"]}
          label="Date Range"
          rules={[
            {
              required: false,
            },
          ]}>
          <RangePicker
            // showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD"
            onChange={(value, dateRange) => {
              getDateRange(value, dateRange);
            }}
            onOk={(value) => DateRangeComfirm(value)}
          />
        </Form.Item>
        <Form.Item label="Order ID" rules={[{ required: false }]} name={["searchParams", "id"]} style={{ width: "30rem", marginRight: "1rem" }}>
          <Input placeholder="Order Id" />
        </Form.Item>{" "}
        <Form.Item label="Controls" style={{ width: "30rem", marginRight: "1rem" }}>
          <Space>
            <Button
              type="primary"
              style={{ width: "7rem" }}
              loading={false}
              onClick={() => {
                onFinish();
                getOrder();
              }}>
              Search
            </Button>
            <Button danger type="primary" style={{ width: "7rem" }} loading={false}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
}
