# backend/app/services/csv_service.py

import os
import pandas as pd

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")


def _path(filename):
    return os.path.join(DATA_DIR, filename)


def ensure_csv(filename, columns):
    path = _path(filename)

    if not os.path.exists(path):
        pd.DataFrame(columns=columns).to_csv(
            path,
            index=False
        )


def read_csv(filename):

    path = _path(filename)

    if not os.path.exists(path):
        return pd.DataFrame()

    df = pd.read_csv(path)

    return df.fillna("")


def append_csv(filename, row, columns=None):

    path = _path(filename)

    if columns:
        ensure_csv(
            filename,
            columns
        )

    if os.path.exists(path):
        df = pd.read_csv(path)
    else:
        df = pd.DataFrame()

    df = pd.concat(
        [df, pd.DataFrame([row])],
        ignore_index=True
    )

    df.to_csv(
        path,
        index=False
    )