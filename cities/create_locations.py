import codecs
import json

queries = [[{
       "model": "cities.country",
       "pk": 1,
       "fields": {"name": "Россия"}
    }],
    [
        {
            "model": "cities.region",
            "pk": 1,
            "fields": {
                "name": 'Города Федерального Значения',
                "country": 1
            }
        }
    ], []]

recorded_regions = []
recorded_cities = []

links = ['./fixtures/country.json',
         './fixtures/region.json',
         './fixtures/city.json']

with codecs.open("cities", "r", "utf_8_sig") as file:
    i = 1
    while True:
        line = file.readline()
        if not line:
            break
        if i == 1:
            i += 1
            continue

        line = line.replace(', ', ',').split(',')

        types = {
            'АО': 'Автономный округ',
            'Аобл': 'Автономная область',
            'Респ': 'Республика',
            'край': 'край',
            'обл': 'область',
        }
        if types.get(line[5]):
            region = line[6] + ' ' + types[line[5]]
        else:
            region = line[6] + ' ' + line[5]

        city = line[9] + ' ' + line[10]

        # postal_code for unique cities with the same titles
        city_rec = line[2]

        if region == ' ':
            region = 'Город областного значения'

        if region not in recorded_regions:
            recorded_regions.append(region)
            queries[1].append({
                "model": "cities.region",
                "pk": recorded_regions.index(region) + 1,
                "fields": {
                    "name": region,
                    "country": 1
                }})

        if city not in recorded_cities:
            recorded_cities.append(city_rec)
            queries[2].append({
                "model": "cities.city",
                "pk": recorded_cities.index(city_rec) + 1,
                "fields": {
                    "name": city,
                    'postal_code': line[2],
                    "region": recorded_regions.index(region) + 1
                    }})

for query, link in zip(queries, links):
    with open(link, 'w') as outfile:
        json.dump(query, outfile)

print('Count regions: ' + str(len(recorded_regions)))
print('Count cities: ' + str(len(recorded_cities)))
