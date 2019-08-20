# elasticsearch templates perfomance
```
docker run -d --name es-perfomance --network host es-perfomance
docker logs es-perfomance | grep -e RESULT -e indexation
```
