import { BadgeDollarSign } from "lucide-react";
import { Link } from "react-router-dom";

type CardProps = {
  title: string
}

export function Card(props: CardProps) {
  return (
    <Link to={'/dashboard/transactions'}>
      <div>
        <BadgeDollarSign />
        <h1>{props.title}</h1>
        <h3>Description</h3>
      </div>
    </Link>
  )
}