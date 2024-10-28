import { useNavigate } from "react-router-dom"
import { useAuthRole } from "../../hooks/useAuthRole"
import { useEffect } from "react"

export function Suppliers() {
  const navigate = useNavigate()
  const role = useAuthRole()

  useEffect(() => {
  
    const canAccessSuppliersPage = role === 'ADMIN'
  
    if (!canAccessSuppliersPage) {
      navigate('/')
    }
  }, [])

  return (
    <>
      <h1>Suppliers</h1>
      <p>Content</p>
    </>
  )
}
