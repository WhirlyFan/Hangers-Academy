"""empty message

Revision ID: 582d1be8c904
Revises:
Create Date: 2022-12-09 22:44:10.517044

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get('SCHEMA')


# revision identifiers, used by Alembic.
revision = '582d1be8c904'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('username', sa.String(
                        length=40), nullable=False),
                    sa.Column('email', sa.String(length=255), nullable=False),
                    sa.Column('hashed_password', sa.String(
                        length=255), nullable=False),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('email'),
                    sa.UniqueConstraint('username')
                    )

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")

    op.create_table('friends',
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.Column('friend_id', sa.Integer(), nullable=False),
                    sa.ForeignKeyConstraint(['friend_id'], ['users.id'], ),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('user_id', 'friend_id')
                    )

    if environment == "production":
        op.execute(f"ALTER TABLE friends SET SCHEMA {SCHEMA};")

    op.create_table('servers',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('owner_id', sa.Integer(), nullable=False),
                    sa.Column('name', sa.String(length=30), nullable=False),
                    sa.Column('private', sa.Boolean(), nullable=True),
                    sa.Column('server_img', sa.String(
                        length=255), nullable=True),
                    sa.Column('created_at', sa.DateTime(), nullable=True),
                    sa.Column('updated_at', sa.DateTime(), nullable=True),
                    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )

    if environment == "production":
        op.execute(f"ALTER TABLE servers SET SCHEMA {SCHEMA};")

    op.create_table('channels',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('server_id', sa.Integer(), nullable=False),
                    sa.Column('name', sa.String(length=30), nullable=True),
                    sa.ForeignKeyConstraint(['server_id'], ['servers.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )

    if environment == "production":
        op.execute(f"ALTER TABLE channels SET SCHEMA {SCHEMA};")

    op.create_table('server_members',
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.Column('server_id', sa.Integer(), nullable=False),
                    sa.ForeignKeyConstraint(['server_id'], ['servers.id'], ),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('user_id', 'server_id')
                    )

    if environment == "production":
        op.execute(f"ALTER TABLE server_members SET SCHEMA {SCHEMA};")

    op.create_table('messages',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('message_content', sa.String(
                        length=255), nullable=False),
                    sa.Column('channel_id', sa.Integer(), nullable=False),
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.Column('created_at', sa.DateTime(), nullable=True),
                    sa.Column('updated_at', sa.DateTime(), nullable=True),
                    sa.ForeignKeyConstraint(['channel_id'], ['channels.id'], ),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )

    if environment == "production":
        op.execute(f"ALTER TABLE messages SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('messages')
    op.drop_table('server_members')
    op.drop_table('channels')
    op.drop_table('servers')
    op.drop_table('friends')
    op.drop_table('users')
    # ### end Alembic commands ###
