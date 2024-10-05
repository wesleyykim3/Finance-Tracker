from flask import request, jsonify
from config import app, db
from models import Purchase


@app.route('/purchases', methods=['GET'])
def get_purchases():
    purchases = Purchase.query.all()
    json_purchases = list(map(lambda x: x.to_json(), purchases))
    return jsonify({'purchases': json_purchases})


@app.route('/create_purchase', methods=['POST'])
def create_purchase():
    description = request.json.get('description')
    date = request.json.get('date')
    amount = request.json.get('amount')

    if not description or not date or not amount:
        return (
            jsonify({'message': 'You must include a description, date and amount'}),
            400,
        )

    new_purchase = Purchase(description=description, date=date, amount=amount)
    try:
        db.session.add(new_purchase)
        db.session.commit()
    except Exception as e:
        return jsonify({'message': str(e)}), 400

    return jsonify({'message': 'Purchase created!'}), 201


@app.route('/edit_purchase/<int:user_id>', methods=['PATCH'])
def edit_purchase(user_id):
    purchase = Purchase.query.get(user_id)

    if not purchase:
        return jsonify({'message': 'Purchase not found'}), 404

    data = request.json
    purchase.description = data.get('description', purchase.description)
    purchase.date = data.get('date', purchase.date)
    purchase.amount = data.get('amount', purchase.amount)

    db.session.commit()

    return jsonify({'message': 'Purchase edited.'}), 200


@app.route('/delete_purchase/<int:user_id>', methods=['DELETE'])
def delete_purchase(user_id):
    purchase = Purchase.query.get(user_id)

    if not purchase:
        return jsonify({'message': 'Purchase not found'}), 404

    db.session.delete(purchase)
    db.session.commit()

    return jsonify({'message': 'Purchase deleted!'}), 200


if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.run(debug=True)