FROM ruby:3.2.2

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

WORKDIR /app/backend

ADD Gemfile /app/backend/Gemfile
ADD Gemfile.lock /app/backend/Gemfile.lock
RUN bundle install

ADD . /app/backend/

CMD bash