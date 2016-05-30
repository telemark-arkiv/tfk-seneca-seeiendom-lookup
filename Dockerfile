###########################################################
#
# Dockerfile for tfk-seneca-session
#
###########################################################

# Setting the base to nodejs 4.4.5
FROM mhart/alpine-node:4.4.5

# Maintainer
MAINTAINER Geir Gåsodden

#### Begin setup ####

# Installs git
RUN apk add --update --no-cache git

# Extra tools for native dependencies
RUN apk add --no-cache make gcc g++ python

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

# Env variables
ENV TFK_SENECA_SEEIENDOM_LOOKUP_TAG tfk-seneca-seeiendom-lookup
ENV TFK_SENECA_SEEIENDOM_LOOKUP_URL https://session.no
ENV TFK_SENECA_SEEIENDOM_LOOKUP_HOST localhost
ENV TFK_SENECA_SEEIENDOM_LOOKUP_PORT 8000

# Startup
CMD ["node", "service.js", "--seneca-log=type:act"]