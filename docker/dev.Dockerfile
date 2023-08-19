FROM python:3.11.4-bookworm

RUN curl -sfL https://direnv.net/install.sh | bash
COPY requirements/local.txt requirements/base.txt /tmp/
RUN pip install -r /tmp/local.txt

RUN mkdir /app
WORKDIR /app
ENTRYPOINT ["python", "manage.py", "runserver", "0.0.0.0:8001"]
# ENTRYPOINT ["tail", "-f", "/dev/null"]
# EXPOSE 8001