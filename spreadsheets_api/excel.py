import pandas as pd

file = "excel.xlsx"
xl = pd.ExcelFile(file)
df1 = xl.parse(xl.sheet_names[0])
keys = df1.keys()


def get_excel_data(dataframe):
    data = [['Ведомость на семинар', '', '', '', '', '', '', '', '', '', '', '']]
    for row in range(len(dataframe)):
        row_data = []
        for columns in range(len(keys)):
            row_data.append(dataframe[keys[columns]][row])
        data.append(row_data)
    values_data = []
    for i in range(len(data)):
        if i > 5:
            values_data.append(data[i])
    return {'data': data, 'values_data': values_data}


prints = get_excel_data(df1)
print(prints['values_data'])