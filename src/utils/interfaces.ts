export interface IProduct extends IOrderProduct, IProductSide {}

export interface IOrderProduct {
  id: number;
  type: "canopy" | "tray" | "toolbox" | "accessories" | "4x4" | "servicebody" | "tubcanopy";
  name: string;
  price: number;
  inStock: number;
  pcPrice: number;
  installPrice: number;
}

export interface IProductSide {
  subtype: "no subtype" | "dogbox" | "drawbar" | "gullwing";
  detailType: "detailType1" | "detailType2" | "detailType3";
  desc: string;
  spec: string;
  updateLog: string;
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

export enum  EfabricationStatus {
  pending = "pending",
  machineProcessing = "machineProcessing",
  machineProcessFinishe = "machineProcessFinished",
  powderCoating = "powderCoating",
  powderCoatingFinished = "powderCoatingFinished",
  waitingForInstallation = "waitingForInstallation",
  installing = "installing",
  ready = "ready",
}

export interface IFabrication {
  fabricationStatus: EfabricationStatus;
}
