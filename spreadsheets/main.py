import spreads as spr
import httplib2
import apiclient.discovery
from oauth2client.service_account import ServiceAccountCredentials

CREDENTIALS_FILE = 'credentials.json'
credentials = ServiceAccountCredentials.from_json_keyfile_name(CREDENTIALS_FILE,
                                                               ['https://www.googleapis.com/auth/spreadsheets',
                                                                'https://www.googleapis.com/auth/drive'])

httpAuth = credentials.authorize(httplib2.Http())
service = apiclient.discovery.build('sheets', 'v4', http=httpAuth)
name = 'Мероприятие'
city = 'Екатеринбург'


def main():
    batch_update_structure_body = {"requests": []}
    batch_update_values_data = []
    spr.create_sample('Ведомость')


if __name__ == '__main__':
    main()
