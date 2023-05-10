import apiclient.discovery
import httplib2
import spreads as s
from oauth2client.service_account import ServiceAccountCredentials


def main():
    credentials_file = "credentials.json"
    credentials = ServiceAccountCredentials.from_json_keyfile_name(
        credentials_file,
        [
            "https://www.googleapis.com/auth/spreadsheets",
            "https://www.googleapis.com/auth/drive",
        ],
    )

    http_auth = credentials.authorize(httplib2.Http())
    service = apiclient.discovery.build("sheets", "v4", http=http_auth)
    drive_service = apiclient.discovery.build("drive", "v3", http=http_auth)
    batch_update_structure_body = {"requests": []}
    batch_update_values_data = []
    s.create_sample(
        "Ведомость",
        service,
        drive_service,
        20,
        batch_update_values_data,
        batch_update_structure_body,
    )
    # id = '1CQI5dDEBpj-S486tWOPNYqJDFadroEu17qIwre2ohA8'
    # s.prepare_spreadsheet_values_data('A8:C8', 'ROWS', batch_update_values_data,
    #                                   values=[[100, 50, '=СУММ(A8:B8)']])
    # s.update_spreadsheet_values(id, service, batch_update_values_data)


if __name__ == "__main__":
    main()
