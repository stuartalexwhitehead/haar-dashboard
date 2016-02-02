FROM debian

# Update
RUN apt-get update && \
    apt-get --yes upgrade

# Install Node.js and NPM
RUN apt-get --yes install curl
RUN curl -sL https://deb.nodesource.com/setup_5.x | bash -
RUN apt-get install --yes nodejs
RUN apt-get install --yes git-core

# Filesystem
COPY . /src

# Install dependancies
RUN cd /src; npm install;

# Runtime
EXPOSE 3001
CMD ["node", "/src/index.js"]