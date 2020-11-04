from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def init_db(app):
    try:
        db.init_app(app)
        print('connection success !')
    except Exception as e:
        print(e)
