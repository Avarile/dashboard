import React from "react";

export const Login = React.lazy(() => import("./Login"));
export const MainEntrance = React.lazy(() => import("./MainEntrance"));
export const DashboardMain = React.lazy(() => import("./DashBoardMain"));
export const OrderManagment = React.lazy(() => import("./OrderManagment"));
export const WareHousingMel = React.lazy(() => import("./WareHousingMel"));
export const WareHousingInbound = React.lazy(
  () => import("./warehouseing-inbound")
);
export const FallbackLoading = () => import("../components/FallbackLoading");
