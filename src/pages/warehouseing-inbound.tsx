import React, { useState } from "react"
import "antd/dist/antd.css"
import { Button } from "antd"
import WarehousingDepositeForm from "@SRC/components/warehousing/DepositeIntoWarehouseForm"
import CreateNewItem from "@SRC/components/warehousing/CreateNewProducts"
import WarehousingAbolishForm from "@SRC/components/warehousing/AbolishProducts"

/* eslint-disable no-template-curly-in-string */

/* eslint-enable no-template-curly-in-string */

const WarehousingInbound = () => {
  //selector init with default selection
  const [selector, setSelector] = useState("Deposite")

  const formSelection = (selector: string) => {
    switch (selector) {
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
            onClick={() => {
              setSelector("Deposite")
            }}>
            Deposite into the WareHouse
          </Button>
          <Button
            onClick={() => {
              setSelector("Create")
            }}>
            Create New Product
          </Button>
          <Button
            onClick={() => {
              setSelector("Abolish")
            }}>
            Abolish Product
          </Button>
        </div>
        {formSelection(selector)}
      </div>
    </div>
  )
}
export default WarehousingInbound
