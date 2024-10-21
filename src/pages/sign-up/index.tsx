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
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    })
    .then(async (response) => await response.json())
  }

  return (
    <>
      <h1>Sign Up</h1>

      <form>
        <input type="text" onChange={(event) => setName(event.target.value)}/>
        <input type="email" onChange={(event) => setName(event.target.value)}/>
        <input type="password" onChange={(event) => setName(event.target.value)}/>

        <button type="submit">Register</button>
      </form>
    </>
  )
}
