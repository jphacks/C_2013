FROM python:3.8

# RUN apt-get update
RUN apt-get update && apt-get install -y cmake

WORKDIR /app
COPY . /app
RUN pip install -r requirements.txt

EXPOSE 5000

ENTRYPOINT [ "sh", "start.sh" ]