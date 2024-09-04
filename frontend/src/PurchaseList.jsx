import React from 'react'

const PurchaseList = ({purchases, editPurchase, updateCallback}) => {

    const totalAmount = purchases.reduce((total, purchase) => total + parseFloat(purchase.amount), 0)
   
    const onDelete = async (id) => {
        try {
            const options = {
                method: 'DELETE'
            }
            const response = await fetch(`http://127.0.0.1:5000/delete_purchase/${id}`, options)
            if (response.status === 200) {
                updateCallback()
            } else {
                console.error('Failed to delete')
            }
        } catch (error) {
            alert(error)
        }
    }

    return <div>
        <h2>Purchases</h2>
        <table>
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {purchases.map((purchase) => (
                    <tr key={purchase.id}>
                        <td>{purchase.description}</td>
                        <td>{purchase.date}</td>
                        <td>{purchase.amount}</td>
                        <td>
                        <button className="icon-button edit" onClick={() => editPurchase(purchase)}>
                            <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button className="icon-button delete" onClick={() => onDelete(purchase.id)}>
                            <i className="fas fa-times"></i>
                        </button>
                        </td>
                    </tr>
                ))}
                <tr>
                    <td colSpan="2"><strong>Total</strong></td>
                    <td><strong>{totalAmount.toFixed(2)}</strong></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
}

export default PurchaseList