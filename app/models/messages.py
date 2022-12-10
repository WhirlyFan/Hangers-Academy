from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Message(db.Model):
    __tablename__ = "messages"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    message_content = db.Column(db.String(255), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("channels.id")), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(
        db.DateTime, default=datetime.now, onupdate=datetime.now)

    channel = db.relationship("Channel", back_populates="messages")
    user = db.relationship("User", back_populates="messages")

    def to_dict(self):
        return {
            'id': self.id,
            'message_content': self.message_content,
            'channel_id': self.channel_id,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
