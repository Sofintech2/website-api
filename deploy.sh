docker stop website-api
docker container rm website-api
docker build -t website-api .
docker run -p 8080:8080 --name website-api -d website-api