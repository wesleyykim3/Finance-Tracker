from config import db

class Purchase(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(80), unique=False, nullable=False)
    date = db.Column(db.String(8), unique=False, nullable=False)
    amount = db.Column(db.Numeric(precision=10, scale=2), unique=False, nullable=False)

    def to_json(self):
        return {
            'id': self.id,
            'description': self.description,
            'date': self.date,
            'amount': self.amount,
        }
