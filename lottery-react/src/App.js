import { useState, useEffect } from "react"

import web3 from "./web3"
import lottery from "./lottery"

function App() {
  const [manager, setManager] = useState()
  web3.eth.getAccounts().then(console.log)

  useEffect(async () => {
    const getManager = async () => await lottery.methods.manager().call()
    // const manager = await lottery.methods.manager().call()
    const manager = getManager()
    // setManager({ manager })
  }, [])

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>This contact is managed by {manager}</p>
    </div>
  )
}

export default App
