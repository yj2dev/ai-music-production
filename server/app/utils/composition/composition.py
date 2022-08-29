from app.utils.composition.composition_ballad import composition_ballad
from app.utils.composition.composition_dance import composition_dance
from app.utils.composition.composition_hiphop import composition_hiphop
from app.utils.composition.composition_trot import composition_trot

def composition(genre):
    # 업로드 패스 또는 False를 반환함
    path = None
    if genre == "ballad":
        print("발라드 생성")
        path = composition_ballad()
    elif genre == "dance":
        print("댄스 생성")
        path = composition_dance()
    elif genre == "hiphop":
        print("힙합 생성")
        path = composition_hiphop()
    elif genre == "trot":
        print("트로트 생성")
        path = composition_trot()
    return path