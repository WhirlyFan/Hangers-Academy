from app.models import db, Channel, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_channels():
    # general1 = Channel(
    #     server_id=1, name='general')
    # general2 = Channel(
    #     server_id=2, name='general')
    # general3 = Channel(
    #     server_id=3, name='general')

    # db.session.add_all([general1, general2, general3])
    # db.session.commit()
    pass


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_channels():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM channels")

    db.session.commit()
