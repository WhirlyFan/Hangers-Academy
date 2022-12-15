from app.models import db, Server, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_servers():
    hangers = Server(
        owner_id=3, name='Hangers')
    bloxcraft = Server(
        owner_id=3, name='BloxCraft')
    app_academy = Server(
        owner_id=3, name='App Academy')

    db.session.add_all([hangers, bloxcraft, app_academy])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_servers():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM servers")

    db.session.commit()
