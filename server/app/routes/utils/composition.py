from keras.layers import Dense, Dropout, LSTM, CuDNNLSTM
from keras.models import Sequential
from keras.models import load_model
from midi2audio import FluidSynth
from keras.utils import np_utils
from music21 import *
import glob, pickle
import numpy as np
import time
def composition(genre):
    print("genre >> ", genre)
    notes = []
    a = []
    ts = {}
    bc = []
    dn = []

    for i, file in enumerate(glob.glob("app/midi/rap/*.mid")):
        midi = converter.parse(file)
        partStream = midi.parts.stream()
        timeSignature = midi.getTimeSignatures()[0]
        bc.append(timeSignature.beatCount)
        dn.append(timeSignature.denominator)

        print('\r', '현재 진행 상황 : ', i, " ", file, end='')

        for p in partStream:
            a.append(p.partName)

        notes_to_parse = None

        try:
            s2 = instrument.partitionByInstrument(midi)
            notes_to_parse = s2.parts[0].recurse()
        except:
            notes_to_parse = midi.flat.notes
        for e in notes_to_parse:
            if isinstance(e, note.Note):
                notes.append(str(e.pitch))
            elif isinstance(e, chord.Chord):
                notes.append('.'.join(str(n) for n in e.normalOrder))

    # 각기 음정 (Note / Chord) 마다 각각 다른 정수에 할당합니다.
    n_vocab = (len(set(notes)))
    pitchnames = sorted(set(item for item in notes))
    note_to_int = dict((note, number) for number, note in enumerate(pitchnames))
    ab = set(a)
    seq_len = 100
    net_in = []
    net_out = []

    for i in range(0, len(notes) - seq_len):
        seq_in = notes[i:i + seq_len]
        seq_out = notes[i + seq_len]
        net_in.append([note_to_int[char] for char in seq_in])
        net_out.append(note_to_int[seq_out])

    n_patterns = len(net_in)
    net_in = np.reshape(net_in, (n_patterns, seq_len, 1))
    net_in = net_in / float(n_vocab)
    net_out = np_utils.to_categorical(net_out)

    # 모델 불러와서 작곡
    model = load_model('app/model/composition_model/Classic_Generator.h5')

    model.summary()

    net_in = []
    output = []
    for i in range(0, len(notes) - seq_len, 1):
        seq_in = notes[i:i + seq_len]
        seq_out = notes[i + seq_len]
        net_in.append([note_to_int[char] for char in seq_in])
        output.append(note_to_int[seq_out])

    n_patterns = len(net_in)

    # pattern : Dataset의 입력 전체 시퀀스 중 랜덤하게 고른 시퀀스
    start = np.random.randint(0, len(net_in) - 1)
    pattern = net_in[start]
    print('Random Sequence : ', pattern)

    # int_to_note: 정수를 다시 Note로 바꾸기 위한 dictionary 자료형

    int_to_note = dict((number, note) for number, note in enumerate(pitchnames))
    print('int_to_note : ', int_to_note)

    # LSTM 모델이 만든 출력값을 저장하기 위한 빈 리스트

    pred_out = []

    # 500개의 노트 생성

    for i in range(0, 500):
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
        print('\r', 'Predicted ', i, " ", result, end='')

        # LSTM이 만든 Note를 하나씩 리스트에 담는다
        pred_out.append(result)

        # 다음 입력을 위해 입력에 새 값 추가 후 가장 과거 값 제거
        # ex) [0:99] -> [1:100] -> ... -> [n : n + 99]
        pattern.append(index)
        pattern = pattern[1:len(pattern)]

    # LSTM 모델이 예측한 값들로부터 MIDI 파일을 만들어준다
    offset = 0  # 음(Note/Chord)을 언제 들려줄지 정하는 timing offset (박자 정보를 대신 함)
    # MIDI 파일 생성을 위한 빈 리스트
    output_notes = []
    # create note and chord objects based on the values generated by the model
    # LSTM 모델 예측 값을 하나씩 처리
    for pattern in pred_out:
        # pattern이 Chord 일 때
        if ('.' in pattern) or pattern.isdigit():
            notes_in_chord = pattern.split('.')  # ['8.1'].split('.') => ['8', '1']
            notes = []  # Note 정보를 저장할 빈 리스트
            # notes_in_chord의 텍스트를 Note 정보로 바꿔준다
            for current_note in notes_in_chord:
                new_note = note.Note(int(current_note))  # Text => 정수 => Note
                new_note.storedInstrument = instrument.Piano()  # 악기 정보 설정
                notes.append(new_note)  # notes 리스트에 더해준다
            # Note => Chord
            new_chord = chord.Chord(notes)
            new_chord.offset = offset  # 시간 정보 설정
            output_notes.append(new_chord)
        # pattern이 Note 일 때
        else:
            new_note = note.Note(pattern)
            new_note.offset = offset
            new_note.storedInstrument = instrument.Piano()
            output_notes.append(new_note)
        # 반복마다 offset을 증가시킨다 (고정 박자)
        offset += 0.5

    # Note/Chord => Stream => MIDI File


    fs = FluidSynth()
    # try:

    midi_stream = stream.Stream(output_notes)
    file_path = f'app/routes/data/output_audio/output_{genre}_{str(int(time.time()))}.mid'
    midi_stream.write('midi', fp=file_path)
    fs.midi_to_audio(file_path, 'app/routes/data/output_audio_wav/temp.wav')

    #     return True
    # except:
    #     return False