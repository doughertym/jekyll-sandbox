FROM node:12-alpine

#WORKDIR /github/workspace/.github/actions/docker-env
#
#RUN npm install
#
#CMD [ "ls", "-la" ]

COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]