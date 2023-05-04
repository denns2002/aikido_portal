import pandas as pd

file = "excel.xlsx"
xl = pd.ExcelFile(file)
df1 = xl.parse(xl.sheet_names[0])
keys = df1.keys()


def get_sheet_data(dataframe):
    data = []
    key_list = []
    for key in keys:
        key_list.append(key)
    data.append(key_list)
    for row in range(len(dataframe)):
        row_data = []
        for columns in range(len(keys)):
            row_data.append(dataframe[keys[columns]][row])
        data.append(row_data)
    print(data)


get_sheet_data(df1)
