### 1) Initialize PostgreSQL container:
```
 docker run --name psql -d -p 5432:5432 -itd --restart always --env 'DB_USER=jpfo' --env 'DB_PASS=turingTest123' --env 'DB_NAME=dynamicore' sameersbn/postgresql:9.6-2

```

### 2) Change DB Host settings in /config/config.json
To get the host IP Address from the PSQL container
```
 docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' postgresql 

```

```

### 3) Setup backend container
Setup Container
```
 docker build -t contacts-directory:latest .

```

### 4) Run backend container
Run Container
```
docker run --name contacts -d -p 3000:3000 contacts-directory
```