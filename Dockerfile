FROM openjdk:22-jdk-oraclelinux8

WORKDIR /app

# Copia somente o JAR final, ignorando o .original
COPY target/erp-lampadas-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
