# Etapa 1: Build usando Maven + JDK 21 (estável)
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copia os arquivos de configuração e código
COPY pom.xml .
COPY src ./src

# Faz o build (gera o .jar na pasta target)
RUN mvn clean package -DskipTests

# Etapa 2: Runtime usando JDK 22
FROM openjdk:22-jdk-oraclelinux8
WORKDIR /app

# Copia o JAR gerado do estágio de build
COPY --from=build /app/target/*.jar app.jar

# Comando para rodar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]
