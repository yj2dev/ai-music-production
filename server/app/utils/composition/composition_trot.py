# 트로트 28곡
import time
import numpy as np
import pandas as pd

from music21 import *
from keras.models import load_model

def composition_trot():
    model = load_model('app/model/composition_model/trotLSTM_Generator.h5')

    # model.summary()

    # LSTM 모델 입력 생성
    df = pd.read_csv('app/data/composition_prop/trot_net_in.csv')
    net_in = df.values
    net_in = net_in.tolist()

    n_vocab = 158

    output = []

    n_patterns = len(net_in)

    pitchnames = pd.read_csv('app/data/composition_prop/trot_pitchnames.csv')
    pitchnames = pitchnames.values
    pitchnames = np.concatenate(pitchnames).tolist()

    # int_to_note: 정수를 다시 Note로 바꾸기 위한 dictionary 자료형
    int_to_note = dict((number, note) for number, note in enumerate(pitchnames))
    # print('int_to_note : ', int_to_note)

    # LSTM 모델이 만든 출력값을 저장하기 위한 빈 리스트
    start = np.random.randint(0, len(net_in) - 1)
    pattern = net_in[start]

    # LSTM 모델이 만든 출력값을 저장하기 위한 빈 리스트

    pred_out = []
    p1 = []
    p2 = []
    p3 = []
    p4 = []
    # 500개의 노트 생성
    for j in range(0, 4):

        for i in range(0, 32):
            # 랜덤하게 고른 시퀀스를 LSTM 모델 입력에 맞게 바꿔준다
            pred_in = np.reshape(pattern, (1, len(pattern), 1))

            # 입력 범위 정규화 / 0 ~ (n_vocab -1) => 0 ~ 1
            pred_in = pred_in / float(n_vocab)

            # LSTM 모델 사용
            prediction = model.predict(pred_in, verbose=0)

            # 출력 중 값이 가장 큰 Index 선택
            index = np.argmax(prediction)

            # 정수 값을 Note 값으로 변경
            result = int_to_note[index]
            # print('\r', 'Predicted ', i, " ", result, end='')

            # LSTM이 만든 Note를 하나씩 리스트에 담는다
            pred_out.append(result)

            # 다음 입력을 위해 입력에 새 값 추가 후 가장 과거 값 제거
            # ex) [0:99] -> [1:100] -> ... -> [n : n + 99]
            pattern.append(index)
            pattern = pattern[1:len(pattern)]

    for i in range(len(pred_out)):
        if i < 32:
            p1.append(pred_out[i])
        elif i < 32 * 2:
            p2.append(pred_out[i])
        elif i < 32 * 3:
            p3.append(pred_out[i])
        elif i < 32 * 4:
            p4.append(pred_out[i])

    p1 = p1 * 14
    p2 = p2 * 14
    p3 = p3 * 7
    p4 = p4 * 28

    output_notes = []

    offset = 0
    for pattern in p1:
        # pattern이 Chord 일 때
        if ('.' in pattern) or pattern.isdigit():
            notes_in_chord = pattern.split('.')  # ['8.1'].split('.') => ['8', '1']
            notes = []  # Note 정보를 저장할 빈 리스트
            # notes_in_chord의 텍스트를 Note 정보로 바꿔준다
            for current_note in notes_in_chord:
                new_note = note.Note(int(current_note))  # Text => 정수 => Note
                notes.append(new_note)  # notes 리스트에 더해준다
            # Note => Chord
            new_chord = chord.Chord(notes)
            new_chord.offset = offset  # 시간 정보 설정
            output_notes.append(new_chord)
        # pattern이 Note 일 때
        else:
            new_note = note.Note(pattern)
            new_note.offset = offset
            output_notes.append(new_note)
        # 반복마다 offset을 증가시킨다 (고정 박자)
        offset += 0.8
    fir = stream.Part(output_notes)
    fir.insert(0, instrument.Dulcimer())

    output_notes = []
    offset = 0
    for pattern in p2:
        # pattern이 Chord 일 때
        if ('.' in pattern) or pattern.isdigit():
            notes_in_chord = pattern.split('.')  # ['8.1'].split('.') => ['8', '1']
            notes = []  # Note 정보를 저장할 빈 리스트
            # notes_in_chord의 텍스트를 Note 정보로 바꿔준다
            for current_note in notes_in_chord:
                new_note = note.Note(int(current_note))  # Text => 정수 => Note
                notes.append(new_note)  # notes 리스트에 더해준다
            # Note => Chord
            new_chord = chord.Chord(notes)
            new_chord.offset = offset  # 시간 정보 설정
            output_notes.append(new_chord)
        # pattern이 Note 일 때
        else:
            new_note = note.Note(pattern)
            new_note.offset = offset
            output_notes.append(new_note)
        # 반복마다 offset을 증가시킨다 (고정 박자)
        offset += 0.8
    tw = stream.Part(output_notes)
    tw.insert(0, instrument.ElectricGuitar())

    output_notes = []
    offset = 0
    for pattern in p3:
        # pattern이 Chord 일 때
        if ('.' in pattern) or pattern.isdigit():
            notes_in_chord = pattern.split('.')  # ['8.1'].split('.') => ['8', '1']
            notes = []  # Note 정보를 저장할 빈 리스트
            # notes_in_chord의 텍스트를 Note 정보로 바꿔준다
            for current_note in notes_in_chord:
                new_note = note.Note(int(current_note))  # Text => 정수 => Note
                notes.append(new_note)  # notes 리스트에 더해준다
            # Note => Chord
            new_chord = chord.Chord(notes)
            new_chord.offset = offset  # 시간 정보 설정
            output_notes.append(new_chord)
        # pattern이 Note 일 때
        else:
            new_note = note.Note(pattern)
            new_note.offset = offset
            output_notes.append(new_note)
        # 반복마다 offset을 증가시킨다 (고정 박자)
        offset += 1.6
    thr = stream.Part(output_notes)
    thr.insert(0, instrument.Flute())

    output_notes = []
    offset = 0
    for pattern in p4:
        # pattern이 Chord 일 때
        if ('.' in pattern) or pattern.isdigit():
            notes_in_chord = pattern.split('.')  # ['8.1'].split('.') => ['8', '1']
            notes = []  # Note 정보를 저장할 빈 리스트
            # notes_in_chord의 텍스트를 Note 정보로 바꿔준다
            for current_note in notes_in_chord:
                new_note = note.Note(int(current_note))  # Text => 정수 => Note
                notes.append(new_note)  # notes 리스트에 더해준다
            # Note => Chord
            new_chord = chord.Chord(notes)
            new_chord.offset = offset  # 시간 정보 설정
            output_notes.append(new_chord)
        # pattern이 Note 일 때
        else:
            new_note = note.Note(pattern)
            new_note.offset = offset
            output_notes.append(new_note)
        # 반복마다 offset을 증가시킨다 (고정 박자)
        offset += 0.4
    fr = stream.Part(output_notes)
    fr.insert(0, instrument.Banjo())

    midi_stream = stream.Stream()
    midi_stream.append(fir)
    midi_stream.append(tw)
    midi_stream.append(thr)
    midi_stream.append(fr)

    try:
        midi_stream = stream.Stream(output_notes)
        file_name = f'output_trot_{str(int(time.time()))}.mid'
        file_path = f'app/data/output_audio/{file_name}'
        midi_stream.write('midi', fp=file_path)
        return file_path
    except:
        return False