from flask_sqlalchemy import SQLAlchemy

from db.database import db


class Template(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(64), unique=True, nullable=False)
    uri = db.Column(db.String(256), unique=True, nullable=False)

    def __repr__(self):
        return '<Template %r>' % self.name

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'uri': self.uri
        }
