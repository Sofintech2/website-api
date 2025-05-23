echo "baixando atualizações"
git pull origin main

echo "removendo versão antiga do docker"
docker stop website-api
docker container rm website-api

echo "buildando versão nova"
docker build -t website-api .

echo "subindo versão nova"
docker run -p 8080:8080 --name website-api -d website-api