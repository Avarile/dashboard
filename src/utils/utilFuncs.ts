import dayjs from "dayjs";

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
  if (stockNumber < 1) {
    return "error";
  } else {
    return "default";
  }
};

export const orderStatusIndicator = (orderStatus: "pending" | "partially Payed" | "fullyPayed(Not yet deliverd)" | "delivered") => {
  switch (orderStatus) {
    case "pending":
      return "error";
      break;
    case "partially Payed":
      return "processing";
      break;
    case "fullyPayed(Not yet deliverd)":
      return "warning";
      break;
    case "delivered":
      return "success";
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

export const debounce = (callback: Function, timer = 1000) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, args), timer);
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
  return dayjs().format("DD/MM/YYYY");
};
