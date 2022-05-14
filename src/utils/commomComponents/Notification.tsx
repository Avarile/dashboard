import React from "react"
import "antd/dist/antd.css"
import { message } from "antd"

export interface IConfig {
  type: "success" | "error" | "warning"
  message?: string
  messageTarget?: string
}
/**
 * notificationControll messageTarget is a token to represent what subject is about this message.
 * @param config: {variant: string, message: string, type: notificationType  } || undefined
 * @returns {Notification}
 */
const Notification = (config: IConfig) => {
  let paylaodMessage
  if (config.message) {
    paylaodMessage = config.message
  } else {
    paylaodMessage = config.messageTarget
  }
  return message[config.type](paylaodMessage)
}

export default Notification
