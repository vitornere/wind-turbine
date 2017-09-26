# Pré Requisitos
## Python 3 e pip3
- ``$ sudo apt-get install python3 python3-pip``

# Instalação
- ``$ mkvirtualenv wind_turbine -p python3``

Sempre que for utilizar o sistema, entre no isolamento do mkvirtualenv com o comando

- ``$ workon wind_turbine``

Instale os plugins python

- ``(wind_turbine) $ pip install -r requirements.txt``

Rode as migrações

- ``(wind_turbine) $ python manage.py migrate``

Rode o servidor

- ``(wind_turbine) $ python manage.py runserver``