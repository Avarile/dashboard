export interface IProduct {
  id: number;
  type:
    | "canopy"
    | "tray"
    | "toolbox"
    | "accessories"
    | "4x4"
    | "servicebody"
    | "tubcanopy";
  name: string;
  price: number;
  instock: number;
  powderCoatingPrice: number;
  installationPrice: number;
  sku: string;
  size: string;
  desc: string;
  spec: string;
  updateLog: string;
}
