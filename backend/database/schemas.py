from pydantic import BaseModel
from typing import List


class GetAdmins(BaseModel):
    username: str


class Song(BaseModel):
    id: int
    song_name: str


class GetSongs(BaseModel):
    songs: List[Song]


class Error(BaseModel):
    message: str
