virtualenv -p `which python3` venv
source venv/Scripts/activate
pip install Django==4.0.2
pip install djangorestframework
pip install djangorestframework-simplejwt
pip install Pillow
pip install -U drf-yasg
pip install django-cors-headers
./manage.py makemigrations
./manage.py migrate