import React, { useEffect } from "react";
import { Navigate, useLocation, RouteObject } from "react-router-dom";
import {
  Login,
  MainEntrance,
  WareHousingInbound,
  OrderManagment,
  WareHousing,
  FallbackLoading,
} from "@PAGE/index";

import Storage from "@DATA/session.controller";

type FallbackComponentType =
  | boolean
  | React.ReactChild
  | React.ReactFragment
  | React.ReactPortal
  | null;
type ChildComponentType = React.LazyExoticComponent<() => JSX.Element>;

// load the component asyncly and while loading display  a fallback component.
const LazyLoadingWrapper = (
  Child: ChildComponentType,
  Fallback?: FallbackComponentType
) => {
  return (
    <React.Suspense fallback={FallbackLoading || <>...</>}>
      <Child />
    </React.Suspense>
  );
};

// tool functions definition
const RequireAuth = ({ children }: { children: JSX.Element }) => {
  // Storage.getCachedDate("USER")
  const [user, setUser] = React.useState(Storage.getCachedDate("USER"));
  useEffect(() => {
    setUser(Storage.getCachedDate("USER"));
    console.log(user);
  }, [Storage]);

  let location = useLocation();

  if (Storage.isVoid(user)) {
    return <Navigate to="/login" state={{ from: location }} replace />; // redirect the user to the /login page, but save the current location the user were. this allows us to send the user back to the page them after they login, which is nicer user experience than drop them off on home page
  }
  return children;
};

type CutonFallBackT =
  | boolean
  | React.ReactChild
  | React.ReactFragment
  | React.ReactPortal
  | null;
type ChildT = React.LazyExoticComponent<() => JSX.Element> | React.FC;
// 加载异步组件的loading
const SuspenseWrapper = (
  Child: ChildT,
  customFallBack?: FallbackComponentType
) => {
  return (
    <React.Suspense fallback={customFallBack || <>...</>}>
      <Child />
    </React.Suspense>
  );
};

// 这个组件通过入参的不同来返回对应的元素 如果入参是一个Functional / class component 则也返回一个component, 如果入参是一个JSX 就也返回一个JSX, 如果入参是一个被lazy返回的组件 那么返回一个被Suspense包裹的组件 ！！！ 完美
const SuspenseWrapperEX = (Child: any, cutonFallBack?: CutonFallBackT) => {
  // 判断jsx
  if (Child.type && !Child._init && !Child._payload) {
    return Child;
  } else {
    // 判断是否为clas和function组件
    if (typeof Child === "function") {
      return <Child></Child>;
    } else {
      // 判断是否为lazy组件
      return (
        <React.Suspense fallback={cutonFallBack || <>...</>}>
          {<Child></Child>}
        </React.Suspense>
      );
    }
  }
};

// route structure
//
export const routes: RouteObject[] = [
  {
    path: "/",
    element: SuspenseWrapper(Login, FallbackLoading),
  },
  {
    path: "/login",
    element: SuspenseWrapper(Login, FallbackLoading),
  },
  {
    path: "/mainentrance",
    element: SuspenseWrapper(() => {
      // a functional component is required here instead of a JSX tag

      return (
        <RequireAuth>
          <MainEntrance />
        </RequireAuth>
      );
    }, FallbackLoading),
    children: [
      {
        // index: true,
        path: "/mainentrance/ordermanagment",
        element: SuspenseWrapper(OrderManagment, FallbackLoading),
      },
      {
        path: "/mainentrance/warehousing/instock/",
        element: SuspenseWrapper(WareHousingInbound, FallbackLoading),
      },
      {
        path: "/mainentrance/warehousing/melstock",
        element: SuspenseWrapper(WareHousing, FallbackLoading),
      },
      {
        path: "/mainentrance/warehousing/bristock",
        element: SuspenseWrapper(WareHousing, FallbackLoading),
      },
      {
        path: "*",
        element: (
          <p style={{ position: "absolute", left: "50%", top: "50%" }}>
            404 Not Found
          </p>
        ),
      },
    ],
  },
];
