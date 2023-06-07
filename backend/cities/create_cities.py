import codecs
import json


def create_cities():
    # Init queries
    queries = [
        [{"model": "cities.country", "pk": 1, "fields": {"name": "Россия"}}],
        [
            {
                "model": "cities.region",
                "pk": 1,
                "fields": {"name": "Города Федерального Значения", "country": 1},
            }
        ],
        [],
    ]
    to_files = [
        "./fixtures/country.json",
        "./fixtures/region.json",
        "./fixtures/city.json",
    ]

    # Check repeats regions and give id's
    recorded_regions = []

    with codecs.open("cities_data", "r", "utf_8_sig") as file:
        line_id = 0  # Also, the id of the cities in the table
        while True:
            line = file.readline()
            if not line:
                break
            if line_id == 0:  # For skip title string
                line_id += 1
                continue
            line = line.replace(", ", ",").split(",")

            # Types Regions
            types = {
                "АО": "автономный округ",
                "Аобл": "автономная область",
                "Респ": "республика",
                "край": "край",
                "обл": "область",
            }

            region_type = line[5]
            region_name = line[6]
            if types.get(region_type):
                # Exceptions
                if region_type == "Респ":
                    if region_name[-2:] == "ая":
                        region = region_name + " " + types[region_type].title()
                    else:
                        region = types[region_type].title() + " " + region_name
                else:
                    region = region_name + " " + types[region_type]

                if region_name == "Ханты-Мансийский Автономный округ - Югра":
                    region = "Ханты-Мансийский" + " " + types[region_type] + " (Югра)"

            elif region_type == "Чувашская":
                region = "Чувашская Республика"

            else:
                region = region_name + " " + region_type

            # If there is no region, then the city of regional significance
            if region == " ":
                region = "Город областного значения"

            city = line[9] + ". " + line[10]  # City name

            # Add Region
            if region not in recorded_regions:
                recorded_regions.append(region)
                queries[1].append(
                    {
                        "model": "cities.region",
                        "pk": recorded_regions.index(region) + 1,
                        "fields": {"name": region, "country": 1},
                    }
                )

            # Add City
            queries[2].append(
                {
                    "model": "cities.city",
                    "pk": line_id,
                    "fields": {
                        "name": city,
                        "postal_code": line[2],
                        "region": recorded_regions.index(region) + 1,
                    },
                }
            )

            line_id += 1

    # Fill JSONs
    for query, link in zip(queries, to_files):
        with open(link, "w") as outfile:
            json.dump(query, outfile)

    print("Count regions: " + str(len(recorded_regions)))
    print("Count cities: " + str(line_id))


if __name__ == "__main__":
    create_cities()
