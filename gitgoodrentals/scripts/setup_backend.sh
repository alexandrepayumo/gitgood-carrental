#!/bin/bash

cd ../backend
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt

# Define an array with the names of the directories to exclude
declare -a exclude_dirs=("backend")

# Loop over all directories in the current directory
for dir in */ ; do
    # Remove trailing slash
    dir=${dir%*/}
    
    # If the directory is in the exclude list, skip it
    if [[ " ${exclude_dirs[@]} " =~ " ${dir} " ]]; then
        continue
    fi

    # Check if the migrations directory with __init__.py file exists
    if [ ! -d "$dir/migrations" ] || [ ! -f "$dir/migrations/__init__.py" ]; then
        # If not, create the migrations directory and __init__.py file
        mkdir -p "$dir/migrations"
        touch "$dir/migrations/__init__.py"
    fi
done

rm db.sqlite3

# Explicitly migrate the 'users' app first
python manage.py makemigrations users
python manage.py migrate users

# Then migrate the rest of the apps
python manage.py makemigrations
python manage.py migrate

deactivate
