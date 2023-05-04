import pandas as pd


file = "excel.xlsx"
xl = pd.ExcelFile(file)
print(xl.sheet_names)
df1 = xl.parse('Лист1')
keys = df1.keys()
for i in keys:
    print(df1[i][6-2])
