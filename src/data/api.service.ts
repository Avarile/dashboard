import Request from "@DATA/api.controller";
import envSwitch from "@SRC/utils/ENVCONFIG";
import { refineQueryString, debounce, deduplicateArray, timeStamp } from "@SRC/utils/utilFuncs";
import qs from "query-string";
import { store } from "./dataStore/store.redux";
import { setSelectedItems, setPrice, setOrderCustomer, setOrderShippingInfo } from "@DATA/dataSlices/order.slice";
import { IUser, IProduct } from "src/utils/interfaces";
import Notification from "@SRC/components/Notification";

const dispatch = store.dispatch;

const env = envSwitch("dev");

export const generateOrder = async (payload: object) => {
  await Request.post(`${env.dbUri}/orders`, payload, {}, "order");
};

export const getOrdersById = async (searchParams: { orderId: string }) => {
  return await Request.get(`${env.dbUri}/orders?${qs.stringify(refineQueryString(searchParams))}`);
};

/**
 * beware that this func is specifically designed for Json-server, if the backend is deployed, this should change.
 */
export const updateOrder = async (
  orderId: number,
  paymentDetail: { method: "cash" | "debitCard" | "creditCard" | "paypal" | "3rdParty"; amount: number; referenceCodes: string; description: string }
) => {
  Request.put(`${env.dbUri}/orders/${orderId}`, paymentDetail, "Payment");
};

export const getProductBySku = async (searchParams: { sku: string }) => {
  return await Request.get(`${env.dbUri}/products?${qs.stringify(refineQueryString(searchParams))}`).then((response: any) => {
    console.log(response);
  });
};

export const getClientsByParams = (
  params: { email: string } | { mobile: number },
  loadingStatus: any,
  setLoadingStatus: any,
  formInstance: any,
  setUiController: any,
  uiController: { userInfo: any; userCreateOrEditSwitch: any; shippingInfo: any }
) => {
  setLoadingStatus({
    ...loadingStatus,
    userInfo: true,
  });
  const tempFunc = async () => {
    await Request.get(`${env.dbUri}/clients?${qs.stringify(refineQueryString(params))}`)
      .then((response: any) => {
        if (response.length > 0) {
          setUiController({
            ...uiController,
            userCreateOrEditSwitch: true,
          });

          const { name, id, email, mobile, vip, address, postcode } = response[0];
          formInstance.setFieldsValue({
            client: {
              name: name,
              email: email,
              mobile: mobile,
              vip: vip,
              address: address,
              postcode: postcode,
              id: id,
            },
          });
        } else {
          formInstance.setFieldsValue({
            client: {
              name: null,
              email: null,
              mobile: null,
              vip: null,
              address: null,
              postcode: null,
              id: null,
            },
          });
        }
      })
      .finally(() => {
        // setUiController({
        //   ...uiController,
        //   userCreateOrEditSwitch: false,
        // })
        setLoadingStatus({
          ...loadingStatus,
          userInfo: false,
        });
      });
  };

  const debouncedTempFunc = debounce(tempFunc, 3000);
  debouncedTempFunc();
};

/**
 * Update exiting user Info or Create new user
 *
 */
export const manipulateUserInfo = async (payload: IUser, funcSwitch: "create" | "update") => {
  let tempPayload;
  if (funcSwitch === "update") {
    tempPayload = { ...payload, updatedAt: timeStamp() };
    await Request.put(`${env.dbUri}/clients/${tempPayload.id}}`, payload, `User Info${payload.name}`);
  }
  if (funcSwitch === "create") {
    tempPayload = { ...payload, createdAt: timeStamp() };
    await Request.post(`${env.dbUri}/clients`, payload, {}, `user: ${payload.name}`);
  } else return Notification({ type: "error", message: "User Component Error" });
};

export const searchProductBySku = async (
  sku: string,
  setLoadingStatus: any,
  loadingStatus: {
    userInfo: boolean;
    shippingInfo: boolean;
    productSearch: boolean;
  },
  formInstance: any,
  columnIndex: number
) => {
  setLoadingStatus({
    ...loadingStatus,
    productSearch: true,
  });
  // console.log(sku)

  await Request.get(`${env.dbUri}/products?sku=${sku}`)
    .then((response: any) => {
      let currentFormValue = formInstance.getFieldValue("products"); // accquire entire list of items
      if (response.length > 0) {
        // console.log(response[0])

        const { name, size, price, powdercoatingprice, installationprice } = response[0]; // accquire the response item
        const currentColumn = {
          name: name,
          size: size,
          price: price,
          pcPrice: powdercoatingprice,
          installPrice: installationprice,
        };
        const changedFormValue = currentFormValue.map((item: any, index: number) => {
          if (index === columnIndex) {
            item.name = currentColumn.name;
            item.size = currentColumn.size;
            item.price = currentColumn.price;
            item.pcPrice = currentColumn.pcPrice;
            item.installPrice = currentColumn.installPrice;

            return item;
          } else return item;
        });

        formInstance.setFieldsValue({ products: changedFormValue });
      } else {
        return null;
      }
    })
    .finally(() => {
      setTimeout(() => {
        setLoadingStatus({
          ...loadingStatus,
          productSearch: false,
        });
      }, 1000);
    });
};
