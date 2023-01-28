from app.models import db, Server, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_servers_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    linus = User(
        username='linushnguyen', email='linus@aa.io', password='password')
    preston = User(
        username='bingusbhan', email='bing@aa.io', password='password')
    kevin = User(
        username='kevinguyen', email='kevkev@aa.io', password='password')
    michael = User(
        username='WhirlyFan', email='whirlyfan@aa.io', password='password')

    db.session.add_all([demo, marnie, bobbie, linus, preston, kevin, michael])
    db.session.commit()

    hangers = Server(
        owner_id=2, name='Hangers', private=False)
    bloxcraft = Server(
        owner_id=2, name='BloxCraft', private=False)
    app_academy = Server(
        owner_id=1, name='App Academy', private=False)
    Demo_marnie = Server(
        owner_id=1, name='Demo_marnie', private=True, server_img="url")

    db.session.add_all([hangers, bloxcraft, app_academy, Demo_marnie])
    db.session.commit()

    hangers.members.extend([demo, marnie, bobbie, linus, preston, kevin, michael])
    bloxcraft.members.extend([marnie, linus, preston, kevin, michael])
    app_academy.members.extend([demo, marnie])
    Demo_marnie.members.extend([demo, marnie])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_servers_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.server_members RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM server_members")
        db.session.execute("DELETE FROM servers")
        db.session.execute("DELETE FROM users")

    db.session.commit()
