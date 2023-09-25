from sqlalchemy import Column, INTEGER, VARCHAR, BINARY
from db_manager import Base, engine


class Songs(Base):
    __tablename__ = "songs"

    id = Column(INTEGER, primary_key=True, index=True)
    song_name = Column(VARCHAR)


class Admins(Base):
    __tablename__ = "admins"

    id = Column(INTEGER, primary_key=True, index=True)
    username = Column(VARCHAR)
    password = Column(BINARY)
    salt = Column(BINARY)


if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)