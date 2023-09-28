import { useState, useEffect } from 'react'
import './App.css'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer' // skal kun bruges til rich text formater
import * as contentful from 'contentful'

function App() {

  const [data, setData] = useState()

  const client = contentful.createClient({
    space: `${import.meta.env.VITE_PUBLIC_SPACE_ID}`,
    environment: 'master',
    accessToken: `${import.meta.env.VITE_PUBLIC_ACCESS_TOKEN}`
  })

  useEffect(() => {
    client.getEntries()
    .then((entry) => setData(entry))
    .catch(console.error)
  }, [])

  return (
    <>

    </>
  )
}

export default App
