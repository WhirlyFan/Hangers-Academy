# from app.models import db, Friend, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_friends():
    friendship1 = Friend(
        user_id=1, friend_id=2)
    friendship2 = Friend(
        user_id=2, friend_id=1)
    friendship3 = Friend(
        user_id=1, friend_id=3)
    friendship4 = Friend(
        user_id=3, friend_id=1)

    db.session.add_all([friendship1, friendship2, friendship3, friendship4])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_friends():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.friends RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM friends")

    db.session.commit()
