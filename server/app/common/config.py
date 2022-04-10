from os import path, environ


base_dir = path.dirname(path.dirname(path.dirname(path.abspath(__file__))))
print('base_dir >> ', base_dir)

@dataclass
class Config:
    BASE_DIR = base_dir

@dataclass
class LocalConfig(Config):
    PROJ_RELOAD: bool = True