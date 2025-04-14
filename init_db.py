from models import Base
from database import engine

def init():
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    init()
