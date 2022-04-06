import React from "react"

export const Login = React.lazy(() => import("./Login"))
export const MainEntrance = React.lazy(() => import("./MainEntrance"))
export const DashboardMain = React.lazy(() => import("./DashBoardMain"))
export const OrderManagment = React.lazy(() => import("./OrderManagment"))
export const WareHousing = React.lazy(() => import("./WareHousing"))
export const FallbackLoading = () => import("./FallbackLoading")
