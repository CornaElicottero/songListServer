from sqlalchemy import func
from sqlalchemy.orm import Session
from . import models, schemas


def get_admins(db: Session, username: str):
    return db.query(models.Admins).filter(models.Admins.username == username).first()


def get_songs_from_db(db: Session):
    return list(db.query(models.Songs).all())


def add_song(db: Session, song_name):
    db_song = models.Songs(
        song_name=song_name
    )
    db.add(db_song)
    db.commit()
    db.refresh(db_song)
    return list(db.query(models.Songs).all())


def add_admin(db: Session, username, user_password, salt):
    db_admin = models.Admins(
        username=username,
        password=user_password,
        salt=salt
    )
    db.add(db_admin)
    db.commit()
    db.refresh(db_admin)
    return db_admin.__dict__
