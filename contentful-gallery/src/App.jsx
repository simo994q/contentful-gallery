import { useState, useEffect } from 'react'
import './App.css'
import style from './App.module.scss'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer' // skal kun bruges til rich text formater
import * as contentful from 'contentful'

function App() {

  const [data, setData] = useState()

  const randomArray = [1, 2, 3, 4]

  const client = contentful.createClient({
    space: `${import.meta.env.VITE_PUBLIC_SPACE_ID}`,
    environment: 'master',
    accessToken: `${import.meta.env.VITE_PUBLIC_ACCESS_TOKEN}`
  })

  useEffect(() => {
    client.getEntries()
      .then((entry) => { setData(entry), console.log(entry) })
      .catch(console.error)
  }, [])

  return (
    <>
      <div className={style.header}>
        {data ? <img src={`https:${data?.items[2].fields.header.fields.file.url}`} alt="" /> : <p>Loading...</p>}
      </div>

      <div className={style.description}>
        <div>
          <article>
            <h2>{data ? data.items[0].fields.descriptionTitle : 'Loading...'}</h2>
            <p>{data ? data.items[0].fields.description : 'Loading...'}</p>
          </article>
        </div>

      </div>

      <div className={style.gallery}>
        {data ? data.items[3].fields.images.map((item, index) => {
          return (
            <div key={index}>
              <img src={`https:${item.fields.file.url}`} alt="" />
              <p>{item.fields.description}</p>
            </div>
          )
        }) : randomArray.map((item, index) => {
          return (
            <div key={index}>
              <img src='/spinner.png' alt="" className={style.loading} />
              <p>Loading...</p>
            </div>
          )
        })
        }
      </div>

      <footer className={style.footer}>
        <p>{data ? data.items[1].fields.owner : 'Loading...'}</p>
      </footer>

    </>
  )
}

export default App
