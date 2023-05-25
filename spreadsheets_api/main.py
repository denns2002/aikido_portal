import spreads as s


def main():
    services = s.start_services('credentials.json')
    batch_update_structure_body = {"requests": []}
    batch_update_values_data = []
    # s.create_sample(
    #     "Ведомость",
    #     services['service'],
    #     services['drive_service'],
    #     20,
    #     batch_update_values_data,
    #     batch_update_structure_body,
    # )
    # spread_id = '1LGmjpqiiLVA6OcmtkJrykFjVQlmQtM0yzu-ROJ6ys9k'
    # s.set_permissions_anyone(spread_id, "writer", services["drive_service"])
    # s.prepare_filter_set_basic_request(batch_update_structure_body)
    # s.update_spreadsheet_structure(spread_id, services['service'], batch_update_structure_body)
    # x = s.get_spreadsheet_data(spread_id, services['service'])
#     y = s.unite_data_spreads(
#         ['https://docs.google.com/spreadsheets/d/1LGmjpqiiLVA6OcmtkJrykFjVQlmQtM0yzu-ROJ6ys9k/edit#gid=0',
#          'https://docs.google.com/spreadsheets/d/1CQI5dDEBpj-S486tWOPNYqJDFadroEu17qIwre2ohA8/edit#gid=0'],
#         services['service']
#     )
#     print(y)
#
#
# if __name__ == "__main__":
#     main()
