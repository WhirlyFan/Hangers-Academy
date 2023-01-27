from app.models import db, User, environment, SCHEMA


def seed_friends():
    demo = User.query.get(1)
    marnie = User.query.get(2)
    bobbie = User.query.get(3)

    demo.friends.extend([marnie, bobbie])
    marnie.friends.extend([demo])
    bobbie.friends.extend([demo])

    db.session.commit()


def undo_friends():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.friends RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM friends")
        db.session.commit()
