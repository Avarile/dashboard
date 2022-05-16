import dayjs from "dayjs";
import { EfabricationStatus, IFabrication, ELogisticStatus, IOrderProduct } from "./interfaces";
import { fabricationStatus } from "./productTypes";
import { deductProduct } from "@SRC/data/api.service";

export type QueryStringType = {
  [Key: string | number]: any;
};

export const refineQueryString = (queryString: QueryStringType) => {
  const response = { ...queryString }; //spread and pass the values to response

  // equals to const result = Object.assign({}, object)
  Object.keys(response).forEach((key: any) => {
    const value: any = response[key]; // ?????? todo need help
    // when value === null/undefined/false  but there is a problem that when value is 0, it will still return false,  so we need to deal with this, cuz 0 is still a valid value, and a valid value should not return false.
    if (isVoid(value)) {
      delete response[key]; // if there is no value, delete the key
    }
  });
  return response;
};

export const isVoid = (value: undefined | null | "") => {
  if (value === undefined || value === null || value === "") {
    return true;
  } else return false;
};

export const stockIndicator = (stockNumber: number): "success" | "warning" | "error" | "processing" | "default" => {
  if (stockNumber >= 10) {
    return "processing";
  }
  if (stockNumber >= 5) {
    // if 10 > stockNumber > 5
    return "success";
  }
  if (stockNumber >= 3) {
    // if 5 > stockNumber > 1
    return "warning";
  }
  if (stockNumber < 3) {
    return "error";
  } else {
    return "default";
  }
};

// interface IOrderStatus {
//   orderStatus: "pending" | "partiallyPayed" | "fullyPayed" | "machineProcessing" | "machineProcessFinished" | "powderCoating" | "powderCoatingFinished" | "ready";
// }

export const orderStatusIndicator = (
  orderStatus: "pending" | "partiallyPayed" | "fullyPayed" | "machineProcessing" | "machineProcessFinished" | "powderCoating" | "powderCoatingFinished" | "installing" | "ready"
) => {
  switch (orderStatus) {
    case "pending":
      return "error";
      break;
    case "partiallyPayed":
    case "machineProcessing":
    case "machineProcessFinished":
    case "powderCoating":
    case "powderCoatingFinished":
    case "installing":
      return "default";
      break;
    case "fullyPayed":
    case "ready":
      return "success";
      break;
  }
};

export const fabricationStatusIndicator = (fabricationStatus: EfabricationStatus) => {
  switch (fabricationStatus) {
    case "pending":
      return "error";
      break;
    case "machineProcessing":
    case "machineProcessFinished":
    case "powderCoating":
    case "powderCoatingFinished":
    case "waitingForInstallation":
    case "installing":
      return "processing";
      break;
    case "ready":
      return "success";
      break;
  }
};

const teseDemo = (fabricationStatus: EfabricationStatus) => {
  let status = EfabricationStatus.pending;
};

export const logisticStatusIndicator = (logisticStatus: ELogisticStatus) => {
  switch (logisticStatus) {
    case "waitingForCarrier":
      return "error";
      break;
    case "pickupAlready":
      return "processing";
      break;
    case "delivering":
      return "processing";
      break;
    case "delivered":
      return "success";
      break;
    case "cannotDeliver":
      return "warning";
      break;
    case "returningToVender":
      return "warning";
      break;
    case "returnedItemArrived":
      return "success";
      break;
    case "itemDamagedInTransport":
      return "error";
      break;
  }
};

export const CaculateTypeItems = (typeName: string | "" | null | undefined, products: any[]): number => {
  let count = 0;
  for (const item of products) {
    if (item.type === typeName) {
      count++;
    } else count = count;
  }

  return count;
};

export const debounce = (callback: Function, timer = 1000): Function => {
  let delay: any;
  return function (this: any, ...args: any) {
    if (delay) {
      clearTimeout(delay);
    }
    delay = setTimeout(() => {
      callback.apply(args);
    }, timer);
  };
};
// howto:
//   const debouncedApiCall = debounce(() => {
//   getClients(queryParams).then((response: any) => {
//     currentOrderRef.current.client = response
//   })
// })
// debouncedApiCall(2000)

/**
 * deduplicate
 * @param array
 * @returns array
 */
export const deduplicateArray = (array: [any]) => {
  return Array.from(new Set(array));
};

export const timeStamp = () => {
  return dayjs().format("YYYY-MM-DD");
};

export const determineItemShouldbeDeduct = (orderFullyPayed: boolean, order: any) => {
  if (orderFullyPayed) {
    order.product.map((item: Omit<IOrderProduct, "id">) => {});
  }
};

/**
 * determine if there is a shortage for each item in the products list and make apicall
 * @param products
 */
export const isShortage = (products: IOrderProduct[]): { sku: string }[] => {
  let result: { sku: string }[] = [];
  for (let item of products) {
    if (item.currentInStock >= 1) {
      //todo: means this order can be put through
      result = [];
    } else {
      result.push({
        sku: item.sku,
      });
    }
  }
  return result;
};

export const deductFromCurrentStock = (product: IOrderProduct) => {
  deductProduct(product);
};
