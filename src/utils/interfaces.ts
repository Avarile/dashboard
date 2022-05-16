export interface IProduct {
  id: number;
  name: string;
  type: "canopy" | "tray" | "toolbox" | "accessories" | "4x4" | "servicebody" | "tubcanopy";
  subtype: "no subtype" | "dogbox" | "drawbar" | "gullwing";
  detail: "detailType1" | "detailType2" | "detailType3";
  sku: string;
  length: number;
  size: string;
  currentInStock: number;
  price: number;
  powdercoatingPrice: number;
  installationPrice: number;
  desc: string;
  spec: string;
  updateLog: string;
}

export interface IOrderProduct {
  id: number;
  sku: string;
  name: string;
  size: string;
  price: number;
  pcPrice: number;
  installPrice: number;
  currentInStock: number;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  mobile: string;
  vip: boolean;
  address: string;
  postcode: number;
}

export interface IOrderDetail {}

export enum EfabricationStatus {
  pending = "pending",
  machineProcessing = "machineProcessing",
  machineProcessFinished = "machineProcessFinished",
  powderCoating = "powderCoating",
  powderCoatingFinished = "powderCoatingFinished",
  waitingForInstallation = "waitingForInstallation",
  installing = "installing",
  ready = "ready",
}

export interface IFabrication {
  fabricationStatus: EfabricationStatus;
}

export enum ELogisticStatus {
  waitingForCarrier = "waitingForCarrier",
  pickupAlready = "pickupAlready",
  delivering = "delivering",
  delivered = "delivered",
  cannotDeliver = "cannotDeliver",
  returningToVender = "returningToVender",
  returnedItemArrived = "returnedItemArrived",
  itemDamagedInTransport = "itemDamagedInTransport",
}

export enum ELogisticProvider {
  AustralianPost = "Australian Post",
  BigPost = "Big Post",
  FastWay = "FastWay",
}

export interface ILogisticSearchParams {
  logisticStatus: ELogisticStatus | undefined;
  logisticProvider: ELogisticProvider | undefined;
  pickupAt: "" | undefined;
  id: number | undefined;
}

export interface IlogisticInfo {
  logisticProvider: string;
  trackingNumber: string;
  pickupAt: Date;
  logisticSideNote: string;
}

export enum EPaymentStatus {
  pending = "pending",
  partiallyPayed = "partiallyPayed",
  fullyPayed = "fullyPayed",
}

export interface IOrderSearchParams {
  logisticStatus: ELogisticStatus;
  fabricationStatus: EfabricationStatus;
  orderStatus: EPaymentStatus;
  id: number;
  dateRange: string;
}
