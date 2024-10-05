import {useState} from 'react'

const PurchaseForm = ({existingPurchase = {}, updateCallback}) => {
    const [description, setDescription] = useState(existingPurchase.description || '')
    const [date, setDate] = useState(existingPurchase.date || '')
    const [amount, setAmount] = useState(existingPurchase.amount || '')

    const updating = Object.entries(existingPurchase).length !== 0

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            description,
            date,
            amount
        }
        const url = 'http://127.0.0.1:5000/' + (updating ? `edit_purchase/${existingPurchase.id}` : 'create_purchase')
        const options = {
            method: updating ? 'PATCH' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if (response.status !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message)
        } else {
            updateCallback()
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor='description'>Description:</label>
                <input
                    type='text'
                    id='description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor='date'>Date:</label>
                <input
                    type='text'
                    id='date'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor='amount'>Amount:</label>
                <input
                    type='text'
                    id='amount'
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <button type='submit'>{updating ? 'Update' : 'Create'}</button>
        </form>
    )
}

export default PurchaseForm