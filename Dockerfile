FROM debian

# Update
RUN apt-get update && \
    apt-get --yes upgrade

# Install Node.js and NPM
RUN apt-get --yes install curl
RUN curl -sL https://deb.nodesource.com/setup_5.x | bash -
RUN apt-get install --yes nodejs
RUN apt-get clean

# Filesystem
COPY . /src

# Env vars for compilation
ENV API__URL=https://api.haar.io/
ENV APP__URL=https://www.haar.io/
ENV NODE_ENV=production

# Install dependancies
RUN cd /src; npm install;
RUN cd /src; npm run compile;

# Runtime
EXPOSE 3001
CMD cd /src; npm start;