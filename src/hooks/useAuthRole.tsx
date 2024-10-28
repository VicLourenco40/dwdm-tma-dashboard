import { jwtDecode, JwtPayload } from 'jwt-decode'
import { useEffect, useState } from 'react'

interface DecodedToken extends JwtPayload {
  role: string | null
}

export function useAuthRole() {
    const [role, setRole] = useState<String | null>(null)

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
          const decoded = jwtDecode<DecodedToken>(token)

          setRole(decoded.role)
        }
    }, [])

    return role
}
