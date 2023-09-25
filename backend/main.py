import os
from typing import Union

import uvicorn
import bcrypt
from sqlalchemy.orm import Session
from fastapi import FastAPI, Request, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from backend.database.schemas import Song
from database import crud, schemas, db_manager

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
db_manager.Base.metadata.create_all(bind=db_manager.engine)
session = db_manager.SessionLocal()


def get_db():
    db = db_manager.SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/get_songs/", response_model=schemas.GetSongs)
def get_songs(request: Request, db: Session = Depends(get_db)):
    db_songs = crud.get_songs_from_db(db)
    songs = [Song(id=song.id, song_name=song.song_name) for song in db_songs]
    return schemas.GetSongs(songs=songs)


@app.post("/add_song/", response_model=schemas.GetSongs)
def add_song(request: Request, song_name: str, db: Session = Depends(get_db)):
    db = db_manager.SessionLocal()
    db_songs = crud.add_song(db, song_name)
    db_songs = crud.get_songs_from_db(db)
    songs = [Song(id=song.id, song_name=song.song_name) for song in db_songs]
    db.close()
    return schemas.GetSongs(songs=songs)


@app.post("/login/", response_model=Union[schemas.GetAdmins, schemas.Error])
def login(request: Request, username: str, user_password: str, db: Session = Depends(get_db)):
    db_user = crud.get_admins(db, username)
    password, salt = db_user.password, db_user.salt
    hashed_password = bcrypt.hashpw(user_password.encode('utf-8'), salt)
    if hashed_password == password:
        return schemas.GetAdmins(username=username)
    else:
        return schemas.Error(message="Invalid login/password")


@app.post("/register/", response_model=schemas.GetAdmins)
def register(request: Request, username: str, user_password: str, db: Session = Depends(get_db)):
    db = db_manager.SessionLocal()
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(user_password.encode('utf-8'), salt)
    new_user = crud.add_admin(db, username, hashed_password, salt)
    db.close()
    return new_user


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

