import { ReactNode } from "react"
import { Link } from "react-router-dom"
import styles from './styles.module.css'

type CardProps = {
  to: string
  icon: ReactNode
  title: string
  description?: string
}

export function Card(props: CardProps) {
  return (
    <Link to={props.to}>
      <div className={styles.card}>
        {props.icon}
        <h1>{props.title}</h1>
        <h2>{props.description}</h2>
      </div>
    </Link>
  )
}
