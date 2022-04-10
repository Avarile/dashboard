import React, { useState } from "react"
import "antd/dist/antd.css"
import { Button } from "antd"
import WarehousingDepositeForm from "@SRC/components/warehousing/DepositeIntoWarehouseForm"
import CreateNewItem from "@SRC/components/warehousing/CreateNewProducts"
import WarehousingAbolishForm from "@SRC/components/warehousing/AbolishProducts"
import { stringify } from "querystring"

/* eslint-disable no-template-curly-in-string */

/* eslint-enable no-template-curly-in-string */

const WarehousingInbound = () => {
  //selector init with default selection
  const [selector, setSelector] = useState<{ select: string; activate: undefined | "primary" }>({ select: "Deposite", activate: undefined })

  const formSelection = (selector: { select: string; activate: any }) => {
    switch (selector.select) {
      case "Deposite":
        return <WarehousingDepositeForm />
        break
      case "Create":
        return <CreateNewItem />
        break
      case "Abolish":
        return <WarehousingAbolishForm />
        break
    }
  }

  return (
    <div style={{ display: "flex", gap: "20px 5rem", alignItems: "flex-start", width: "100%" }}>
      <div style={{ marginTop: "5rem", display: "flex", width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: " 2rem" }}>
          <h3>Please click to select operation </h3>
          <Button
            type={selector.select === "Deposite" ? "primary" : undefined}
            onClick={() => {
              setSelector({ ...selector, select: "Deposite" })
            }}>
            Deposite into the WareHouse
          </Button>
          <Button
            type={selector.select === "Create" ? "primary" : undefined}
            onClick={() => {
              setSelector({ ...selector, select: "Create" })
            }}>
            Create New Product
          </Button>
          <Button
            type={selector.select === "Abolish" ? "primary" : undefined}
            onClick={() => {
              setSelector({ ...selector, select: "Abolish" })
            }}>
            Abolish / Edit Product Info
          </Button>
        </div>
        {formSelection(selector)}
      </div>
    </div>
  )
}
export default WarehousingInbound
