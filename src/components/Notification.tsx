import React from "react"
import "antd/dist/antd.css"
import { message } from "antd"

export interface IConfig {
  type: "success" | "error" | "warning"
  message: string
}

/**
 * notificationControll
 * @param config: {variant: string, message: string, type: notificationType  } || undefined
 * @returns {Notification}
 */
const Notification = (config: IConfig) => {
  return message[config.type](config.message)
}

export default Notification