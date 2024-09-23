import { useState } from 'react'
import styles from './styles.module.css'

export function Transactions() {
  const [transactions, setTransactions] = useState([
    {
      'id': 1,
      'description': 'Office supplies purchase',
      'amount': 123,
      'type': 'outcome',
      'category': 'Office'
    },
    {
      'id': 2,
      'description': 'Employee X\'s salary',
      'amount': 2000,
      'type': 'outcome',
      'category': 'Salary'
    },
    {
      'id': 3,
      'description': 'Computer sale',
      'amount': 1500,
      'type': 'income',
      'category': 'Office'
    }
  ])

  const [filterByDescription, setFilterByDescription] = useState('')

  return (
    <main>
      <header className={styles.header}>
        <div className={styles.filters}>
          <input type='text' placeholder='Search' onChange={(event) => {
            setFilterByDescription(event.target.value)
          }}/>
          <select>
            <option>Select category</option>
            <option>Office</option>
            <option>Salary</option>
            <option>Cleaning</option>
          </select>
        </div>
        <button className={styles.newTransactionButton}>New transaction</button>
      </header>

      <h1>{filterByDescription}</h1>

      <table className={styles.table}>
        <tbody>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
          {
            transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td>{transaction.description}</td>
                  <td className={transaction.type === 'income' ? styles.income : styles.outcome}>
                    {transaction.type === 'outcome' ? '- ' : '+ '}
                    {transaction.amount}
                  </td>
                  <td>{transaction.category}</td>
                  <td>23/09/2024</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </main>
  )
}
