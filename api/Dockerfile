FROM ruby:2.7.7

## Set working directory for the Rails application
WORKDIR ./api

# Copy Gemfiles to the container
COPY Gemfile Gemfile.lock ./

# Copy docker-entrypoint to the container
COPY docker-entrypoint.sh /docker-entrypoint.sh

# Set permission for for allowing the execution of the docker-enrtpoint file
RUN chmod +x /docker-entrypoint.sh

# Install all dependencies
RUN bundle install

# Copy Rails app to the container
COPY . .

EXPOSE 3000

# Set the a script that should be executed before the CMD
ENTRYPOINT ["/docker-entrypoint.sh" ]

# Set the default command to start the Rails server
CMD ["rails", "server", "-b", "0.0.0.0"]

