import os


def setup_db():
    """
    Load data into static database models.
    If there are fields in the database, the script will overwrite them
    with the standard ones.

    For example: regions, cities, dates, roles, etc.
    """

    comm = ""
    files = ["rank.json", "role.json", "country.json", "region.json", "city.json"]

    print("Before you start you need to make Django migrations.")

    while not comm:
        comm = input("Make migrations and migrate commands? [y/n]: ")

    if comm == "y":
        os.system("python manage.py makemigrations")
        os.system("python manage.py migrate")

    for file in files:
        os.system("python manage.py loaddata " + file)

    print("OK: The database fields are filled in.")


if __name__ == "__main__":
    setup_db()
