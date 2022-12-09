from .db import db, environment, SCHEMA, add_prefix_for_prod


class Friend(db.Model):
    __tablename__ = "friends"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    friend_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'friend_id': self.friend_id,
            'user_id': self.user_id
        }
