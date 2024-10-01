import {useState, useEffect} from 'react'
import SessionList from './SessionList'
import './App.css'
import SessionForm from './SessionForm'

function App() {
  const [purchases, setPurchases] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPurchase, setCurrentPurchase] = useState({})

  useEffect(() => {
    fetchPurchases()
  }, [])

  const fetchPurchases = async () => {
    const response = await fetch('http://127.0.0.1:5000/purchases')
    const data = await response.json()
    setPurchases(data.purchases)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentPurchase({})
  }

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  const openEditModal = (purchase) => {
    if (isModalOpen) return
    setCurrentPurchase(purchase)
    setIsModalOpen(true)
  }

  const onUpdate = () => {
    closeModal()
    fetchPurchases()
  }

  return (
    <>
      <SessionList purchases={purchases} editPurchase={openEditModal} updateCallback={onUpdate} />
      <button className="create-button" onClick={openCreateModal}>Create New Purchase</button>
      {isModalOpen && <div className='modal'>
        <div className='modal-content'>
          <button className='modal-close-button' onClick={closeModal}>
            <i className="fas fa-times"></i>
          </button>
          <SessionForm existingPurchase={currentPurchase} updateCallback={onUpdate} />
        </div>
      </div>
      }
    </>
  )
}

export default App
