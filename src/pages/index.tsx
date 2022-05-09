import React from "react";

export const Login = React.lazy(() => import("./Login"));
export const MainEntrance = React.lazy(() => import("./MainEntrance"));
export const DashboardIndex = React.lazy(() => import("./DashboardIndex"));
export const OrderManagment = React.lazy(() => import("./OrderManagment"));
export const WareHousingMel = React.lazy(() => import("./WareHousingMel"));
export const WareHousingInbound = React.lazy(() => import("./warehouseing-inbound"));
export const LogisticIndex = React.lazy(() => import("./LogisticIndex"));
export const FabricationIndex = React.lazy(() => import("./FabricationIndex"));
export const PowderCoating = React.lazy(() => import("./PowderCoating"));
export const Workshop = React.lazy(() => import("./Workshop"));
export const Customize = React.lazy(() => import("./Customize"));
export const FallbackLoading = () => import("../components/FallbackLoading");
