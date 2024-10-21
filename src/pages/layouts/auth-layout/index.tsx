import { Outlet } from "react-router-dom"

export function AuthLayout() {
  return (
    <>
      <h1>Auth</h1>
      <Outlet />
    </>
  )
}
