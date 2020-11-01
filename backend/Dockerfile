FROM python:3.8

# RUN apt-get update
RUN apt-get update
RUN apt-get install -y cmake
RUN apt-get install -y libgl1-mesa-dev

WORKDIR /app
COPY . /app
RUN pip install -r requirements.txt

EXPOSE 5000

ENTRYPOINT [ "python", "app.py" ]