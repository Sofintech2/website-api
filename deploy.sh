echo "baixando atualizações"
git pull origin main

echo "buildando versão nova"
docker build -t website-api .

echo "removendo versão antiga do docker"
docker stop website-api
docker container rm website-api

echo "subindo versão nova"
docker run -d -p 8080:8080 -v $(pwd)/uploads:/app/uploads --name website-api website-api