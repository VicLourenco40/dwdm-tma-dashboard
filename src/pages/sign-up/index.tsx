import { FormEvent, useState } from "react"

export function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleCreateNewAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    console.log({
      name,
      email,
      password
    })

    await fetch('http://localhost:8000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    })
    .then(async (response) => {
      return {
        response,
        data: await response.json()
      }
    })
    .then(({data, response}) => {
      console.log(data);

      if (response.status === 201) {
        localStorage.setItem('token', data.token)
      }
    })
  }

  return (
    <>
      <h1>Sign Up</h1>

      <form onSubmit={handleCreateNewAccount}>
        <input type="text" onChange={(event) => setName(event.target.value)}/>
        <input type="email" onChange={(event) => setEmail(event.target.value)}/>
        <input type="password" onChange={(event) => setPassword(event.target.value)}/>

        <button type="submit">Register</button>
      </form>
    </>
  )
}
