eval "$(ssh-agent -s)" &&
ssh-add -k ~/.ssh/id_rsa &&
source ~/.profile
echo "$DOCKER_PASSWORD" | docker login --username $DOCKER_USERNAME --password-stdin
docker stop iklankan
docker rm iklankan
docker rmi griffindeveloper/iklankan:latest
docker run -d --name iklankan -p 8443:80 griffindeveloper/iklankan:latest