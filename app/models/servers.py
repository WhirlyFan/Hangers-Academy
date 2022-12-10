from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

server_members = db.Table(
    "server_members",
    db.Model.metadata,
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("users.id")),
        primary_key=True,
    ),
    db.Column(
        "server_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("servers.id")),
        primary_key=True,
    ),
)

if environment == "production":
    server_members.schema = SCHEMA


class Server(db.Model):
    __tablename__ = "servers"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    name = db.Column(db.String(30), nullable=False)
    private = db.Column(db.Boolean, default=False)
    server_img = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    members = db.relationship(
        "User", secondary=server_members, back_populates="servers"
    )
    channels = db.relationship(
        "Channel", cascade="all, delete-orphan", back_populates="server"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "owner_id": self.owner_id,
            "name": self.name,
            "private": self.private,
            "server_img": self.server_img,
            "Channels": [channel.to_dict() for channel in self.channels],
            "Members": [member.to_dict() for member in self.members],
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
