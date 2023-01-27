from app.models import db, Message, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_messages():
    message1 = Message(
        message_content="Sup guys!", channel_id=1, user_id=1)
    message2 = Message(
        message_content="gang gang", channel_id=2, user_id=2)
    message3 = Message(
        message_content="lazer hot dog", channel_id=3, user_id=2)
    message4 = Message(
        message_content="hi marnie!", channel_id=4, user_id=1)
    message5 = Message(
        message_content="sup demodawg!!", channel_id=4, user_id=2)

    db.session.add_all([message1, message2, message3, message4, message5])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_messages():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM messages")

    db.session.commit()
