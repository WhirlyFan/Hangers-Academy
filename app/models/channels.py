from .db import db, environment, SCHEMA, add_prefix_for_prod


class Channel(db.Model):
    __tablename__ = "channels"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("servers.id")), nullable=False)
    name = db.Column(db.String(30), nullable=False)

    server = db.relationship("Server", back_populates="channels")
    messages = db.relationship("Message", back_populates="channel")

    def to_dict(self):
        return {
            'id': self.id,
            'server_id': self.server_id,
            'name': self.name
        }
