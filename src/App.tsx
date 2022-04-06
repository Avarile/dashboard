import React from "react"
import { routes } from "./routes/routes"
import { useRoutes } from "react-router-dom"

function App() {
  let RouteIntegration = () => {
    return useRoutes(routes)
  }
  return (
    <div>
      <RouteIntegration></RouteIntegration>
    </div>
  )
}

export default App
