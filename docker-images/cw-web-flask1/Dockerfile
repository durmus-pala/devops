FROM python:alpine
MAINTAINER "Clarusway DevOps Team"
WORKDIR /project
ADD . /project
RUN pip install -r requirements.txt
ENTRYPOINT [ "python" ]
CMD [ "app.py" ]