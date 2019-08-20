# elasticsearch templates perfomance

### templates
```
ngram_2-2.json
ngram_2-3.json
ngram_2-20.json
ngram_3-3.json
ngram_3-3_punctuation.json
ngram_3-4.json
ngram_3-4_punctuation.json
ngram_3-20.json
```

### build && run
```
docker build -t es-perfomance .
docker run -d --name es-perfomance --network host es-perfomance
docker logs es-perfomance | grep -e RESULT -e indexation
```
