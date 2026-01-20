\# FoodAssistent Backend



\## Teknik

\- Java 21 (LTS)

\- Spring Boot 3.5.x

\- MySQL (Docker)

\- Flyway (databasmigrationer)

\- Maven Wrapper



---



\## Starta projektet (Windows)



```powershell

git clone https://github.com/Nordstromjerrie/FoodAssistent.git

cd FoodAssistent

copy .env.example .env

docker compose up -d

cd backend

.\\mvnw.cmd spring-boot:run

