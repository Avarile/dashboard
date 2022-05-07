import React, { useRef, useState } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Space, FormInstance, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined, CarryOutFilled } from "@ant-design/icons";
import { getClientsByParams, manipulateUserInfo, searchProductBySku, generateOrder } from "@DATA/api.service";
import { setSelectedItems, setPrice, setOrderCustomer, setOrderShippingInfo, selectOrder } from "@DATA/dataSlices/order.slice";
import { useDispatch, useSelector } from "react-redux";

const { Search, TextArea } = Input;

const CreateNewQuotation = () => {
  const [formInstance] = Form.useForm();
  const dispatch = useDispatch();
  const selectedItems = useSelector(selectOrder).selectedItems;
  const orderShippingInfo = useSelector(selectOrder).orderShippingInfo;
  const orderClient = useSelector(selectOrder).orderClient;
  const orderPrices = useSelector(selectOrder).orderPrices;

  const [loadingStatus, setLoadingStatus] = React.useState({
    userInfo: false,
    shippingInfo: false,
    productSearch: false,
    orderCreation: false,
  });
  const [uiController, setUIController] = React.useState({
    userInfo: false,
    userCreateOrEditSwitch: false,
    shippingInfo: false,
  });

  const onFinish = (values: any) => {
    setLoadingStatus({
      ...loadingStatus,
      orderCreation: true,
    });

    setTimeout(() => {
      console.log("Received values of form:", values);
      // add the order Status into the orderInfo
      const payload = {
        ...values,
        orderStatus: "pending",
        orderPayed: 0,
        orderDeposit: 0,
        paymentDetail: [],
        balanceDue: values.price.totalAmount - values.price.orderDeposit - values.price.orderPayed,
      };

      generateOrder(payload).then(() => {
        setLoadingStatus({
          ...loadingStatus,
          orderCreation: false,
        });
      });
    }, 2000);
  };

  const priceCalc = () => {
    debugger;
    let totalItemPrice = 0,
      totalPcPrice = 0,
      totalInstallPrice = 0;

    for (let item of formInstance?.getFieldValue("products")) {
      totalItemPrice += Number(item.price);
      totalPcPrice += Number(item.pcPrice);
      totalInstallPrice += Number(item.installPrice);
    }
    const orderPrice = {
      itemPrice: totalItemPrice,
      pcPrice: totalPcPrice,
      installPrice: totalInstallPrice,
      totalAmount: totalItemPrice + totalPcPrice + totalInstallPrice,
    };
    const currentFormValue = formInstance.getFieldValue("price");

    // dispatch(setPrice(orderPrice))
    formInstance.setFieldsValue({
      price: {
        itemPrice: totalItemPrice,
        pcPrice: totalPcPrice,
        installPrice: totalInstallPrice,
        totalAmount: totalItemPrice + totalPcPrice + totalInstallPrice,
      },
    });
    console.log(currentFormValue);
  };

  const generateClientQueryString = () => {
    let queryParam;
    let currentFormValue = formInstance?.getFieldValue("client");
    if (!isNaN(currentFormValue.clientSearch)) {
      // if the string can be transform to number and bigger than 0, it must be a number.
      queryParam = { mobile: Number(currentFormValue.clientSearch) };
    } else {
      queryParam = { email: currentFormValue.clientSearch };
    }
    return queryParam;
  };

  return (
    <Form name="orderCreationForm" onFinish={onFinish} autoComplete="off" labelCol={{ span: 2 }} wrapperCol={{ span: 22 }} form={formInstance}>
      <Form.Item label="User Selection">
        <Form.Item
          name={["client", "clientSearch"]}
          rules={[{ required: false }]}
          style={{
            display: "inline-block",
            width: "calc(20%)",
            paddingRight: "5px",
          }}>
          <Search
            allowClear
            loading={loadingStatus.userInfo}
            placeholder="Please Input the client Email or Mobile Number"
            onChange={() => {
              getClientsByParams(generateClientQueryString(), loadingStatus, setLoadingStatus, formInstance, setUIController, uiController);
            }}
          />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} name={["client", "id"]} style={{ display: "inline-block", width: "calc(5%)", paddingRight: "5px" }}>
          <Input disabled placeholder="ID" />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} name={["client", "name"]} style={{ display: "inline-block", width: "calc(25%)", paddingRight: "5px" }}>
          <Input disabled={uiController.userInfo} placeholder="client name" />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} name={["client", "email"]} style={{ display: "inline-block", width: "calc(35%)", paddingRight: "5px" }}>
          <Input disabled={uiController.userInfo} placeholder="client email" />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} name={["client", "mobile"]} style={{ display: "inline-block", width: "calc(15%)", paddingRight: "5px" }}>
          <Input disabled={uiController.userInfo} placeholder="client mobile" />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} name={["client", "vip"]} style={{ display: "inline-block", width: "calc(10%)", paddingRight: "5px" }}>
          <Input disabled={uiController.userInfo} placeholder="client status" />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} name={["client", "address"]} style={{ display: "inline-block", width: "calc(35%)", paddingRight: "5px" }}>
          <Select placeholder="Please select SubType of the product">
            <Select.Option key={1} value={false}>
              false
            </Select.Option>
            <Select.Option key={2} value={true}>
              true
            </Select.Option>
          </Select>
          {/* <Input disabled={uiController.userInfo} placeholder="Address" /> */}
        </Form.Item>
        <Form.Item name={["client", "postcode"]} style={{ display: "inline-block", width: "calc(35%)", paddingRight: "5px" }} rules={[{ required: true }]}>
          <Input disabled={uiController.userInfo} placeholder="Postcode" />
        </Form.Item>

        <Form.Item style={{ display: "inline-block", marginRight: "5px" }}>
          <Button
            type="primary"
            block
            style={{}}
            onClick={() => {
              const { id, name, email, mobile, vip, address, postcode } = formInstance.getFieldValue("client");
              const payload = {
                id: id,
                name: name,
                email: email,
                mobile: mobile,
                vip: vip,
                address: address,
                postcode: postcode,
              };
              manipulateUserInfo(payload, "update");
            }}>
            Update User
          </Button>
        </Form.Item>
        <Form.Item style={{ display: "inline-block" }}>
          <Button
            type="primary"
            block
            style={{}}
            onClick={() => {
              const { id, name, email, mobile, vip, address, postcode } = formInstance.getFieldValue("client");
              manipulateUserInfo(
                {
                  id: id,
                  name: name,
                  email: email,
                  mobile: mobile,
                  vip: vip,
                  address: address,
                  postcode: postcode,
                },
                "create"
              );
            }}>
            Create User
          </Button>
        </Form.Item>
      </Form.Item>

      <Form.Item label="Shipping Info">
        <Form.Item
          name={["shipping", "address"]}
          rules={[{ required: true }]}
          style={{
            display: "inline-block",
            width: "calc(55%)",
            paddingRight: "5px",
          }}>
          <Input placeholder="Shipping Address" disabled={uiController.shippingInfo} />
        </Form.Item>
        <Form.Item name={["shipping", "postcode"]} style={{ display: "inline-block", width: "calc(10%)", paddingRight: "5px" }}>
          <Input disabled={uiController.shippingInfo} placeholder="postcode" />
        </Form.Item>
        <Form.Item name={["shipping", "shippingFee"]} style={{ display: "inline-block", width: "calc(15%)", paddingRight: "5px" }}>
          <Input disabled={uiController.shippingInfo} placeholder="shippingFee" />
        </Form.Item>

        <Form.Item style={{ display: "inline-block" }}>
          <Button
            loading={loadingStatus.shippingInfo}
            type="primary"
            block
            style={{}}
            onClick={() => {
              setLoadingStatus({
                ...loadingStatus,
                shippingInfo: true,
              });
              setTimeout(() => {
                if (!uiController.shippingInfo) {
                  console.log(formInstance.getFieldValue("shipping"));
                  dispatch(setOrderShippingInfo(formInstance.getFieldValue("shipping")));
                }
                setUIController({
                  ...uiController,
                  shippingInfo: !uiController.shippingInfo,
                });
                setLoadingStatus({
                  ...loadingStatus,
                  shippingInfo: false,
                });
              }, 2000);
            }}>
            {uiController.shippingInfo ? "Update Shipping info" : "Comfirm Shipping info"}
          </Button>
        </Form.Item>
      </Form.Item>

      <Form.Item label="Item List">
        <Form.List name="products">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: "flex" }} align="start" size={1}>
                  <Form.Item {...restField} name={[name, "sku"]} rules={[{ required: true, message: "required" }]} style={{ width: "12rem" }}>
                    <Input
                      placeholder="SKU"
                      onChange={() => {
                        // console.log(formInstance?.getFieldValue("products"))
                        searchProductBySku(formInstance?.getFieldValue("products")[name].sku, setLoadingStatus, loadingStatus, formInstance, name);
                      }}
                    />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "name"]} rules={[{ required: true, message: "required" }]} style={{ width: "15rem" }}>
                    <Input placeholder="Product Name" />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "size"]} rules={[{ required: true, message: "required" }]}>
                    <Input placeholder="Size" />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "price"]} rules={[{ required: true, message: "required" }]} style={{ width: "7rem" }}>
                    <Input placeholder="Item Price" />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "pcPrice"]} rules={[{ required: true, message: "required" }]} style={{ width: "9rem" }}>
                    <Input placeholder="Powder Coating" />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "installPrice"]} rules={[{ required: true, message: "required" }]} style={{ width: "7rem" }}>
                    <Input placeholder="Install Fee" />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "detail"]}>
                    <Input placeholder="Detail" style={{ width: "24rem" }} />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button style={{ width: "86rem" }} type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                  Add field
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  style={{ width: "86rem" }}
                  type="primary"
                  onClick={() => {
                    priceCalc();
                  }}
                  icon={<CarryOutFilled />}>
                  Update or Comfirm Product Selection
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        {/* Price list */}
        <Form.Item label="Item Price" name={["price", "itemPrice"]} style={{ width: "25rem", marginRight: "1rem" }}>
          <Input />
        </Form.Item>
        <Form.Item label="PowderCoating" name={["price", "pcPrice"]} style={{ width: "25rem", marginRight: "1rem" }}>
          <Input />
        </Form.Item>
        <Form.Item label="Installation" name={["price", "installPrice"]} style={{ width: "25rem", marginRight: "1rem" }}>
          <Input />
        </Form.Item>
        <Form.Item label="Total Amount" name={["price", "totalAmount"]} style={{ width: "25rem", marginRight: "1rem" }}>
          <Input />
        </Form.Item>
      </Form.Item>

      <Form.Item label="Description" style={{ width: "94rem" }} name="orderDescription">
        <TextArea rows={15} />
      </Form.Item>
      <Form.Item label="click to Submit">
        <Button type="primary" htmlType="submit" block style={{ width: "86rem" }} loading={loadingStatus.orderCreation} disabled={loadingStatus.orderCreation}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateNewQuotation;
