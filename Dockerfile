# Etapa 1: build da aplicação
FROM maven:3.9.6-eclipse-temurin-21 AS builder
WORKDIR /app

# Copia pom.xml e baixa dependências antes (cache)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copia o código e compila
COPY src ./src
RUN mvn clean package -DskipTests

# Etapa 2: imagem final, mais leve
FROM eclipse-temurin:21-jdk
WORKDIR /app

# Copia o jar da etapa de build
COPY --from=builder /app/target/*.jar app.jar

# Variáveis de ambiente (podem ser sobrescritas no deploy)
ENV JDBC_DATABASE_URL=""
ENV JDBC_DATABASE_USERNAME=""
ENV JDBC_DATABASE_PASSWORD=""

# Expõe a porta padrão do Spring Boot
EXPOSE 8080

# Comando de execução
ENTRYPOINT ["java", "-jar", "app.jar"]
