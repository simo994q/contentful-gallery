import { useState, useEffect } from 'react'
import './App.css'
import style from './App.module.scss'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer' // skal kun bruges til rich text formater
import * as contentful from 'contentful'
import { motion } from "framer-motion"
import Modal from 'react-modal';

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

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalImg, setModalImg] = useState()

  function openModal(img) {
    setModalImg(img)
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(255, 255, 255, 0.3)'
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      padding: '10px',
      borderRadius: '10px'
    },
  };

  return (
    <>
      <div className={style.header}>
        {data ? <img src={`https:${data?.items[2].fields.header.fields.file.url}`} alt="" /> : <p>Loading...</p>}
      </div>

      <div className={style.description}>
        <article>
          <h2>{data ? data.items[0].fields.descriptionTitle : 'Loading...'}</h2>
          <p>{data ? data.items[0].fields.description : 'Loading...'}</p>
        </article>
      </div>

      <div className={style.gallery}>
        {data ? data.items[3].fields.images.map((item, index) => {
          return (
            <div key={index}>
              <motion.img src={`https:${item.fields.file.url}`} onClick={() => openModal(`https:${item.fields.file.url}`)} alt=""
                initial={{ opacity: 0, scale: 0.5, y: -100 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
              />
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        className={style.modal}>
        <img src={modalImg} alt="" style={{borderRadius: '10px'}}/>
        <button onClick={() => closeModal()} style={{borderRadius: '10px'}}>Close</button>
      </Modal>
    </>
  )
}

export default App
