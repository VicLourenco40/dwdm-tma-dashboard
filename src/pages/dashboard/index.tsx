import { Card } from '../../components/card'
import { BadgeDollarSign, ChartNoAxesCombined, Container } from 'lucide-react'
import { useAuthRole } from '../../hooks/useAuthRole'
import styles from './styles.module.css'

export function Dashboard() {
  const role = useAuthRole()

  const canAccessSuppliersPage = role === 'ADMIN'

  return (
    <div className={styles.content}>
      <Card to='/dashboard/transactions' icon={<BadgeDollarSign />} title='Transactions'/>
      
      {
        canAccessSuppliersPage &&
        <Card to='/dashboard/suppliers' icon={<Container />} title='Suppliers'/>
      }
      
      <Card to='/dashboard/metrics' icon={<ChartNoAxesCombined />} title='Metrics'/>
    </div>
  )
}
