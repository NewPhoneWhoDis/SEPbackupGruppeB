#FROM maven:3.8.6-openjdk-18 AS build
#COPY src /app/
#COPY pom.xml /app/
#RUN mvn -f /app/pom.xml clean install -DskipTests

#FROM openjdk:17
#EXPOSE 8080
#ENTRYPOINT ["java", "-jar", "/app/target/tipphub-0.0.1-SNAPSHOT.jar"]


FROM maven:3.8.6-openjdk-18 AS build
ADD target/tipphub-0.0.1-SNAPSHOT.jar ./
ENTRYPOINT ["java", "-jar", "tipphub-0.0.1-SNAPSHOT.jar"]
EXPOSE 8080

#./mvnw clean package -DskipTests