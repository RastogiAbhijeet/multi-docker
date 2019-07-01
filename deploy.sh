docker build -t lolistan/multi-docker-client:latest -t lolistan/multi-docker-client:$SHA -f ./client/Dockerfile ./client
docker build -t lolistan/multi-docker-server:latest -t lolistan/multi-docker-server:$SHA -f ./server/Dockerfile ./server
docker build -t lolistan/multi-docker-worker:latest -t lolistan/multi-docker-worker:$SHA -f ./worker/Dockerfile ./worker

docker push lolistan/multi-docker-client:latest
docker push lolistan/multi-docker-client:$SHA

docker push lolistan/multi-docker-server:latest
docker push lolistan/multi-docker-server:$SHA

docker push lolistan/multi-docker-worker:latest
docker push lolistan/multi-docker-worker:$SHA

kubectl apply -f ./K8s

kubectl set image deployments/server-deployment server=lolistan/multi-docker-server:$SHA
kubectl set image deployments/client-deployment client=lolistan/multi-docker-client:$SHA
kubectl set image deployments/worker-deployment worker=lolistan/multi-docker-worker:$SHA
