from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .servers import server_members

friends = db.Table(
    "friends",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), primary_key=True),
    db.Column("friend_id", db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), primary_key=True)
)


if environment == "production":
    friends.schema = SCHEMA


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)


    servers = db.relationship(
        "Server", secondary=server_members, back_populates="members")
    messages = db.relationship("Message", back_populates="user")
    friends = db.relationship("User", secondary=friends, cascade="all, delete", primaryjoin=(
        friends.c.user_id == id), secondaryjoin=(friends.c.friend_id == id), backref=db.backref("user_ids"))

    def to_dict_base(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
        }

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'servers': [server.to_dict() for server in self.servers],
            'friends': [friend.to_dict_base() for friend in self.friends]
        }
