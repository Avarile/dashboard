import React from "react"
import "antd/dist/antd.css"
import { Spin } from "antd"
import { Loading3QuartersOutlined } from "@ant-design/icons"

export const FallbackLoading = () => {
  const icon = <Loading3QuartersOutlined style={{ fontSize: 24 }} spin />
  return <Spin indicator={icon} />
}
