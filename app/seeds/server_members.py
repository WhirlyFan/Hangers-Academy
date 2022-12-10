from app.models import db, server_members, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_server_members():
    member1 = server_members(
        user_id=1, server_id=1)
    member2 = server_members(
        user_id=2, server_id=1)
    member3 = server_members(
        user_id=1, server_id=2)

    db.session.add_all([member1, member2, member3])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_server_members():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.server_members RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM server_members")

    db.session.commit()
