import { Card } from '../../components/card'
import { BadgeDollarSign, ChartNoAxesCombined, Container } from 'lucide-react'
import styles from './styles.module.css'

export function Dashboard() {
  return (
    <div className={styles.content}>
      <Card to='/dashboard/transactions' icon={<BadgeDollarSign />} title='Transactions'/>
      <Card to='/dashboard/suppliers' icon={<Container />} title='Suppliers'/>
      <Card to='/dashboard/metrics' icon={<ChartNoAxesCombined />} title='Metrics'/>
    </div>
  )
}
