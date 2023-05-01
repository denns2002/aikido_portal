

def create_sheet(title, serv, row_count):  # string name of spreadsheet
    spreadsheet = serv.spreadsheets().create(body={
        'properties': {'title': title, 'locale': 'ru_RU'},
        'sheets': [{'properties': {'sheetType': 'GRID',
                                   'sheetId': 0,
                                   'title': 'Лист1',
                                   'gridProperties': {'rowCount': row_count, 'columnCount': 12}}}]}).execute()

    with open('IDs.txt', mode='a') as IDs:
        IDs.write('https://docs.google.com/spreadsheets/d/' + spreadsheet['spreadsheetId'] + '/edit#gid=0' + '\n')
    return spreadsheet['spreadsheetId']


def set_permissions_anyone(spreadsheet_id, role, drive_serv):
    drive_serv.permissions().create(
        fileId=spreadsheet_id,
        body={'type': 'anyone', 'role': role},
        fields='id'
    ).execute()


def set_permissions_user(spreadsheet_id, email, role, drive_serv):
    drive_serv.permissions().create(
        fileId=spreadsheet_id,
        body={'type': 'user', 'role': role, 'emailAddress': email},
        fields='id'
    ).execute()


def get_spreadsheet(spreadsheet_id, serv):
    spreadsheet = serv.spreadsheets().get(spreadsheetId=spreadsheet_id).execute()
    return spreadsheet


batch_update_structure_body = {"requests": []}


def update_spreadsheet_structure(spreadsheet_id, serv):
    serv.spreadsheets().batchUpdate(spreadsheetId=spreadsheet_id,
                                    body=batch_update_structure_body).execute()
    batch_update_structure_body.clear()


def prepare_changing_width(start_index, end_index, pixel_size):
    dimension_properties = {
        "updateDimensionProperties": {
            "range": {
                "sheetId": 0,
                "dimension": "COLUMNS",
                "startIndex": start_index,
                "endIndex": end_index
            },
            "properties": {
                "pixelSize": pixel_size
            },
            "fields": "pixelSize"
        }
    }
    batch_update_structure_body["requests"].append(dimension_properties)


def prepare_changing_height(start_index, end_index, pixel_size):
    dimension_properties = {
        "updateDimensionProperties": {
            "range": {
                "sheetId": 0,
                "dimension": "ROWS",
                "startIndex": start_index,
                "endIndex": end_index
            },
            "properties": {
                "pixelSize": pixel_size
            },
            "fields": "pixelSize"
        }
    }
    batch_update_structure_body["requests"].append(dimension_properties)


def prepare_merge_request(merge_range):  # string 'A1:B1'
    a = edit_ranges(merge_range)
    merge_request = {'mergeCells': {'range': {'sheetId': 0,
                     'startRowIndex': a[0],
                      'endRowIndex': a[1],
                      'startColumnIndex': a[2],
                      'endColumnIndex': a[3]},
                      'mergeType': 'MERGE_ALL'}}
    batch_update_structure_body["requests"].append(merge_request)


def prepare_multiple_merge_request(merge_ranges):  # list of string ranges ['A1:B1', 'A2:B2', ...]
    for i in range(len(merge_ranges)):
        prepare_merge_request(merge_ranges[i])


def prepare_horiz_alignment_request(cells_range):  # string 'A1:B1'
    a = edit_ranges(cells_range)
    cells_request = {'repeatCell': {'range': {'sheetId': 0,
                                              'startRowIndex': a[0],
                                              'endRowIndex': a[1],
                                              'startColumnIndex': a[2],
                                              'endColumnIndex': a[3]},
                                    'cell': {'userEnteredFormat': {'horizontalAlignment': 'CENTER'}},
                                    'fields': 'userEnteredFormat.horizontalAlignment'}}
    batch_update_structure_body["requests"].append(cells_request)


def prepare_text_format_request(cells_range, is_bold):  # string 'A1:B1', boolean
    a = edit_ranges(cells_range)
    cells_request = {'repeatCell': {'range': {'sheetId': 0,
                                              'startRowIndex': a[0],
                                              'endRowIndex': a[1],
                                              'startColumnIndex': a[2],
                                              'endColumnIndex': a[3]},
                                    'cell': {'userEnteredFormat': {'textFormat': {'bold': is_bold}}},
                                    'fields': 'userEnteredFormat.textFormat.bold'}}
    batch_update_structure_body["requests"].append(cells_request)


def prepare_font_size_request(cells_range, font_size):  # string 'A1:B1', font size - integer
    a = edit_ranges(cells_range)
    cells_request = {'repeatCell': {'range': {'sheetId': 0,
                                              'startRowIndex': a[0],
                                              'endRowIndex': a[1],
                                              'startColumnIndex': a[2],
                                              'endColumnIndex': a[3]},
                                    'cell': {'userEnteredFormat': {'textFormat': {'fontSize': font_size}}},
                                    'fields': 'userEnteredFormat.textFormat.fontSize'}}
    batch_update_structure_body["requests"].append(cells_request)


def prepare_background_color_request(cells_range, rgb):  # string 'A1:B1', rgb list of int [0.1, 0.1, 0.1]
    a = edit_ranges(cells_range)
    cells_request = {'repeatCell': {'range': {'sheetId': 0,
                                              'startRowIndex': a[0],
                                              'endRowIndex': a[1],
                                              'startColumnIndex': a[2],
                                              'endColumnIndex': a[3]},
                                    'cell': {'userEnteredFormat': {'backgroundColor': {'red': rgb[0],
                                                                                       'green': rgb[1],
                                                                                       'blue': rgb[2]}
                                                                   }},
                                    'fields': 'userEnteredFormat.backgroundColor'}}
    batch_update_structure_body["requests"].append(cells_request)


batch_update_values_data = []


def update_spreadsheet_values(spreadsheet_id, serv):
    serv.spreadsheets().values().batchUpdate(spreadsheetId=spreadsheet_id, body={
        "valueInputOption": "USER_ENTERED",
        "data": batch_update_values_data
    }).execute()
    batch_update_values_data.clear()


def prepare_spreadsheet_values_data(grid_range, dimension, values):
    update_spreadsheet_values_data = {"range": "Лист1!" + grid_range,
                                      "majorDimension": dimension,
                                      "values": values}
    batch_update_values_data.append(update_spreadsheet_values_data)


def edit_ranges(grid_range):
    a = grid_range.split(':')
    start_row = ''
    end_row = ''
    start_column = ord(a[0][0]) - ord('A')
    end_column = ord(a[1][0]) - ord('A') + 1
    for i in range(len(a[0]) - 1):
        start_row += a[0][i + 1]
        end_row += a[1][i + 1]
    return [int(start_row)-1, int(end_row), start_column, end_column]


def create_sample(title, serv, drive_serv, row_count):
    spreadsheet_id = create_sheet(title, serv, row_count)
    set_permissions_anyone(spreadsheet_id, 'reader', drive_serv)
    prepare_merge_request('A1:I1')
    prepare_merge_request('A2:B2')
    prepare_changing_width(0, 1, 50)
    prepare_changing_width(1, 2, 150)
    prepare_changing_height(0, 3, 30)
    prepare_spreadsheet_values_data('A6:L6', 'ROWS', values=[
                [
                    '№', 'ФИО', 'Степень кю/дан', 'Тренер', 'группа по возрасту', 'группа по программе',
                    'на какой кю аттестуется', 'годовой взнос', 'семинар', 'аттестация', 'паспорт', 'примечания'
                ]
                ])
    prepare_spreadsheet_values_data('A1:B4', 'ROWS', values=[
        [
         'Ведомость на семинар', ''
        ],
        ['2023 Год', ''],
        ['клуб', 'детский'],
        ['город', 'Екб']
    ])
    prepare_background_color_request('A6:L6', [0.28, 0.45, 0.9])
    prepare_text_format_request('A6:L6', True)
    prepare_font_size_request('A1:A1', 32)
    prepare_text_format_request('A1:A1', True)
    prepare_changing_height(0, 1, 60)
    update_spreadsheet_values(spreadsheet_id, serv)
    update_spreadsheet_structure(spreadsheet_id, serv)
