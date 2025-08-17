# Imagem base do Java 17 (OpenJDK)
FROM eclipse-temurin:17-jdk

# Pasta de trabalho no container
WORKDIR /app

# Copia o JAR gerado pelo Maven/Gradle
COPY target/*.jar app.jar

# Porta que sua aplicação usa (ajuste se necessário)
EXPOSE 8080

# Comando para rodar o app
CMD ["java", "-jar", "app.jar"]