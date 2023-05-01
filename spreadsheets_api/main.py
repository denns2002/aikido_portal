import spreads as spr
import httplib2
import apiclient.discovery
from oauth2client.service_account import ServiceAccountCredentials


def main():
    credentials_file = 'credentials.json'
    credentials = ServiceAccountCredentials.from_json_keyfile_name(credentials_file,
                                                                   ['https://www.googleapis.com/auth/spreadsheets',
                                                                    'https://www.googleapis.com/auth/drive'])

    http_auth = credentials.authorize(httplib2.Http())
    service = apiclient.discovery.build('sheets', 'v4', http=http_auth)
    drive_service = apiclient.discovery.build('drive', 'v3', http=http_auth)
    batch_update_structure_body = {"requests": []}
    batch_update_values_data = []
    spr.create_sample('Ведомость', service, drive_service, 20, batch_update_values_data, batch_update_structure_body)


if __name__ == '__main__':
    main()
