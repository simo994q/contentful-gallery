import { useState, useEffect } from 'react'
import './App.css'
import style from './App.module.scss'
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
    .then((entry) => {setData(entry), console.log(entry)})
    .catch(console.error)
  }, [])

  return (
    <>
      <div className={style.header}>
        <img src={`https:${data?.items[2].fields.header.fields.file.url}`} alt="" />
      </div>

      <div className={style.description}>
        <article>
          <h2>{data?.items[0].fields.descriptionTitle}</h2>
          <p>{data?.items[0].fields.description}</p>
        </article>
      </div>

      <div className={style.gallery}>
        {data?.items[3].fields.images.map((item, index) => {
          return (
            <div key={index}>
              <img src={`https:${item.fields.file.url}`} alt="" />
              <p>{item.fields.description}</p>
            </div>
          )
        })}
      </div>

      <footer className={style.footer}>
        <p>{data?.items[1].fields.owner}</p>
      </footer>

    </>
  )
}

export default App
