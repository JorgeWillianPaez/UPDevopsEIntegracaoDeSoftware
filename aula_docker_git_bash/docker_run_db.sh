docker run \
    --name db1 \
    --network minha-rede \
    -e MYSQL_ROOT_PASSWORD=senha123 \
    -e MYSQL_DATABASE=exampledb \
    -v '/c/Users/jorge38904/OneDrive - Sistema Fiep/Área de Trabalho/UPDevopsEIntegracaoDeSoftware/aula_docker_git_bash:/etc/mysql/my.cnf' \
    -p 3307:3306 \
    -d mysql:8.0