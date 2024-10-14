import { Link } from 'react-router-dom';
import { Card } from '../../components/card';
import { BadgeDollarSign, ChartNoAxesCombined, Container } from 'lucide-react';
import styles from './styles.module.css';

export function Dashboard() {
  return (
    <div className={styles.content}>
      <Link to={'/dashboard/transactions'}>
        <div className={styles.card}>
          <BadgeDollarSign />
          <h1>Transactions</h1>
        </div>
      </Link>
      <Link to={'/dashboard/suppliers'}>
        <div className={styles.card}>
          <Container />
          <h1>Suppliers</h1>
        </div>
      </Link>
      <Link to={'/dashboard/metrics'}>
        <div className={styles.card}>
          <ChartNoAxesCombined />
          <h1>Metrics</h1>
        </div>
      </Link>

      <Card title='Transactions'/>
      <Card title='Suppliers'/>
      <Card title='Metrics'/>
    </div>
  )
}
