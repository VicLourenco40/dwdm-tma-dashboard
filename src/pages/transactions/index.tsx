import { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'

type Transaction = {
  id: number
  description: string
  amount: number
  category: string
  type: 'income' | 'outcome'
}

export function Transactions() {
  useEffect(() => {
    fetchTransactions()
  }, [])

  const [transactions, setTransactions] = useState<Transaction[]>([])

  const [filterByDescription, setFilterByDescription] = useState('')

  async function fetchTransactions() {
    await fetch('http://127.0.0.1:8000/api/transactions', {
      method: 'GET'
    }).then(async (response) => {
      return await response.json()
    }).then((data) => {
      setTransactions(data.transactions)
    })
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const descriptionLower = transaction.description.toLowerCase()
    const filterLower = filterByDescription.toLowerCase()

    return descriptionLower.includes(filterLower)
  })

  const dialogRef = useRef()

  function handleOpenDialog() {
    dialogRef.current.showModal()
  }

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
        <button
          className={styles.newTransactionButton}
          onClick={handleOpenDialog}
        >
          New transaction
        </button>
        <dialog ref={dialogRef}>
          <h1>Dialog</h1>
        </dialog>
      </header>
      <table className={styles.table}>
        <tbody>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
          {
            filteredTransactions.map((transaction) => {
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
