import { createBrowserRouter } from 'react-router-dom'
import { Dashboard } from './pages/dashboard'
import { AppLayout } from './pages/layouts/app-layout'
import { Transactions } from './pages/transactions'
import { Suppliers } from './pages/suppliers'
import { Metrics } from './pages/metrics'
import { AuthLayout } from './pages/layouts/auth-layout'
import { SignIn } from './pages/sign-in'
import { SignUp } from './pages/sign-up'

export const router = createBrowserRouter([
    {
        element: <AuthLayout />,
        children: [
            {
                path: '/auth/sign-in',
                element: <SignIn />
            },
            {
                path: '/auth/sign-up',
                element: <SignUp />
            }
        ]
    },
    {
        element: <AppLayout />,
        children: [
            {
                path: '/',
                element: <Dashboard />
            },
            {
                path: '/dashboard/transactions',
                element: <Transactions />
            },
            {
                path: '/dashboard/suppliers',
                element: <Suppliers />
            },
            {
                path: '/dashboard/metrics',
                element: <Metrics />
            }
        ]
    }
])
