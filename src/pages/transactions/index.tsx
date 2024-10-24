import { FormEvent, useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import { useNavigate } from 'react-router-dom'

type Category = {
  id: number
  title: string
}

type Transaction = {
  id: number
  description: string
  amount: number
  category: Category
  type: 'income' | 'outcome'
  date: string
}

export function Transactions() {
  useEffect(() => {
    fetchTransactions(),
    fetchCategories()
  }, [])

  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  const [filterByDescription, setFilterByDescription] = useState('')
  const [filterByCategory, setFilterByCategory] = useState(0)

  async function fetchTransactions() {
    await fetch('http://127.0.0.1:8000/api/transactions', {
      method: 'GET'
    }).then(async (response) => {
      return await response.json()
    }).then((data) => {
      setTransactions(data.transactions)
    })
  }

  const navigate = useNavigate();

  async function fetchCategories() {
    await fetch('http://127.0.0.1:8000/api/categories', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(async (response) => {
      return {
        response,
        data: await response.json()
      }
    })
    .then((result) => {
      if (result.response.status === 401) {
        localStorage.removeItem('token');

        navigate('auth/sign-in', {
          replace: true
        });
      }

      setCategories(result.data.categories)
    })
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const descriptionLower = transaction.description.toLowerCase()
    const filterLower = filterByDescription.toLowerCase()

    const hasFilter = descriptionLower.includes(filterLower)
    const hasCategory = !filterByCategory || transaction.category.id === filterByCategory

    return hasFilter && hasCategory 
  })

  const dialogRef = useRef<HTMLDialogElement | null>(null)

  function handleOpenDialog() {
    dialogRef.current!.showModal()
  }

  function handleCloseDialog() {
    dialogRef.current!.close()
  }

  const[description, setDescription] = useState('')
  const[amount, setAmount] = useState(0)
  const[category, setCategory] = useState('')
  const[type, setType] = useState<'income' | 'outcome'>('income')
  const[date, setDate] = useState('')

  async function handleNewTransactionSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    await fetch('http://localhost:8000/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description: description,
        amount: amount,
        category: category,
        type: type,
        date: date
      })
    })
    .then(async (response) => await response.json())
    .then((data) => {
      console.log(data)
    })
  }

  return (
    <main>
      <header className={styles.header}>
        <div className={styles.filters}>
          <input type='text' placeholder='Search' onChange={(event) => {
            setFilterByDescription(event.target.value)
          }}/>
          <select
            onChange={(event) => {
              setFilterByCategory(Number(event.target.value))
            }}
          >
            <option value="0">Select category</option>
            {
              categories.map((category) => {
                return (
                  <option value={category.id}>
                    {category.title}
                  </option>
                )
              })
            }
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
                  setCategory(event.target.value)
                }}
              >
                {
                  categories.map((category) => {
                    return (
                      <option value={category.id}>
                        {category.title}
                      </option>
                    )
                  })
                }
              </select>
            </fieldset>
            <fieldset>
              <label>Date</label>
              <input
                type='date'
                placeholder='Emission date'
                onChange={(event) => {
                  setDate(event.target.value)
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
                  event.target.value === 'income' && setType('income')
                }}
              />
              <label>Outcome</label>
              <input
                type='radio'
                name='type'
                value='outcome'
                onChange={(event) => {
                  event.target.value === 'outcome' && setType('outcome')
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
                  <td>{transaction.category.title}</td>
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
