import { createBrowserRouter } from 'react-router-dom';
import { Dashboard } from './pages/dashboard';
import { AppLayout } from './pages/layouts/app-layout';
import { Transactions } from './pages/transactions';
import { Suppliers } from './pages/suppliers';
import { Metrics } from './pages/metrics';

export const router = createBrowserRouter([
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
