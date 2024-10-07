import { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'

type Transaction = {
  id: number
  description: string
  amount: number
  category: string
  type: 'income' | 'outcome',
  date: string
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
    dialogRef.current!.showModal()
  }

  function handleCloseDialog() {
    dialogRef.current!.close()
  }

  const[description, setDescription] = useState('');
  const[amount, setAmount] = useState(0);
  const[category, setCategory] = useState('');
  const[type, setType] = useState<'income' | 'outcome'>('income');
  const[date, setDate] = useState('');

  async function handleNewTransactionSubmit(event) {
    event.preventDefault();

    /*
    const transaction = {
      id: transactions.length + 1,
      description: description,
      amount: amount,
      category: category,
      date: date,
      type: type
    }
    */

    await fetch('http://localhost:8000/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description: description,
        amount: amount,
        category: category,
        type: type
      })
    })
    .then(async (response) => await response.json())
    .then((data) => {
      console.log(data);
    })

    //setTransactions([...transactions, transaction]);
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
        <dialog ref={dialogRef} className={styles.dialog}>
          <div className={styles.dialogHeader}>
            <h1>New transaction</h1>
            <button type='button' onClick={handleCloseDialog}>X</button>
          </div>
          <form onSubmit={handleNewTransactionSubmit} className={styles.form}>
            <fieldset>
              <label>Description</label>
              <input
                type='text'
                placeholder='Describe your transaction'
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value)
                }}
              />
            </fieldset>
            <fieldset>
              <label>Amount</label>
              <input
                type='text'
                placeholder='Transaction value'
                onChange={(event) => {
                  setAmount(Number(event.target.value))
                }}
              />
            </fieldset>
            <fieldset>
              <label>Category</label>
              <select
                onChange={(event) => {
                  setCategory(event.target.value);
                }}
              >
                <option></option>
                <option value='1'>Wages</option>
                <option value='2'>Office supplies</option>
                <option value='3'>Sales</option>
              </select>
            </fieldset>
            <fieldset>
              <label>Date</label>
              <input
                type='date'
                placeholder='Emission date'
                onChange={(event) => {
                  setDate(event.target.value);
                }}
              />
            </fieldset>
            <fieldset className={styles.radioGroup}>
              <label>Income</label>
              <input
                type='radio'
                name='type'
                value='income'
                onChange={(event) => {
                  setType(event.target.value);
                }}
              />
              <label>Outcome</label>
              <input
                type='radio'
                name='type'
                value='outcome'
                onChange={(event) => {
                  setType(event.target.value);
                }}
              />
            </fieldset>
            <button type='submit'>Add</button>
          </form>
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
