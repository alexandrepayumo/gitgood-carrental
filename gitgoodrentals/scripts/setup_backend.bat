@echo off

cd ../backend
python -m venv env
call env\Scripts\activate
pip install -r requirements.txt

for /D %%G in (*) do (
    if not "%%G"=="backend" (
        if not exist "%%G\migrations" (
            mkdir "%%G\migrations"
            type nul > "%%G\migrations\__init__.py"
        )
    )
)

del db.sqlite3

python manage.py makemigrations users
python manage.py migrate users

python manage.py makemigrations
python manage.py migrate

call deactivate