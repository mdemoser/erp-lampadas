# Usa JDK
FROM maven:3.9.3-eclipse-temurin-22 AS build
WORKDIR /app

# Copia pom.xml e o código-fonte
COPY pom.xml .
COPY src ./src

# Build do JAR
RUN mvn clean package -DskipTests

# Segunda fase: só o JAR
FROM openjdk:22-jdk-oraclelinux8
WORKDIR /app
COPY --from=build /app/target/erp-lampadas-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
o