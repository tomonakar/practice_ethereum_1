import { useState, useEffect } from "react"

import web3 from "./web3"
import lottery from "./lottery"

function App() {
  const [manager, setManager] = useState("")
  const [players, setPlayers] = useState([])
  const [balance, setBalance] = useState("")
  const [value, setValue] = useState("")
  const [message, setMessage] = useState("")
  web3.eth.getAccounts().then(console.log)

  useEffect(() => {
    try {
      const init = async () => {
        const manager = await lottery.methods.manager().call()
        const players = await lottery.methods.getPlayers().call()
        const balance = await web3.eth.getBalance(lottery.options.address)
        setManager(manager)
        setPlayers(players)
        setBalance(balance)
      }
      init()
    } catch (e) {
      console.log({ e })
    }
  }, [])

  const onSubmit = async (event) => {
    event.preventDefault()
    const accounts = await web3.eth.getAccounts()

    setMessage("申し込みが完了するのを待っています...")

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(value),
    })

    setMessage("申し込みが完了しました！")
  }

  const onClick = async () => {
    const accounts = await web3.eth.getAccounts()
    setMessage("処理の完了を待っています...")

    await lottery.methods.pickWinner().send({
      from: accounts[0],
    })

    setMessage("当選者が確定しました！")
  }

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>
        This contract is managed by {manager}. There are currently{" "}
        {players.length} people entered, competing to win{" "}
        {web3.utils.fromWei(balance, "ether")} ether!
      </p>

      <hr />
      <form onSubmit={onSubmit}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
        <button>Enter</button>
      </form>

      <hr />

      <h4>Ready to pick a winner?</h4>
      <button onClick={onClick}>Pick a winner!</button>

      <hr />

      <h1>{message}</h1>
    </div>
  )
}

export default App
