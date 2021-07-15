import { useState, useEffect } from "react"

import web3 from "./web3"
import lottery from "./lottery"

function App() {
  const [manager, setManager] = useState()
  web3.eth.getAccounts().then(console.log)

  useEffect(() => {
    try {
      const getManager = async () => {
        const manager = await lottery.methods.manager().call()
        setManager(manager)
      }
      getManager()
    } catch (e) {
      console.log({ e })
    }
  }, [])

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>This contact is managed by {manager}</p>
    </div>
  )
}

export default App
