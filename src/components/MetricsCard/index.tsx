import { ReactNode } from 'react'
import styles from './styles.module.css'

type MetricsCardProps = {
  title: string
  icon: ReactNode
  value: number
  difference: number
}

export function MetricsCard(props: MetricsCardProps) {
  return (
    <div className={styles.card}>
      <header>
        <h1>{props.title}</h1>
        {props.icon}
      </header>
      <div className={styles.main}>
        <h2>{props.value}€</h2>
        <p>{props.difference}% from last month</p>
      </div>
    </div>
  )
}
