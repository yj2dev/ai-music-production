import pandas as pd


def run():
    return 'run...'


def import_csv():
    df = pd.read_csv('app/routes/utils/extract_music_prop_0727_70.csv', index_col='filename')
    print(df)
    pass