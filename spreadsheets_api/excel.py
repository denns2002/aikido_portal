import pandas as pd

file = 'excel.xlsx'
xl = pd.ExcelFile(file)
print(xl.sheet_names)
# df1 = xl.parse('Лист1')
# print(df1)
