# MyHabix

## Getting Started

### Sviluppo in locale (con container docker)

Configurare le variabili di ambiente:
- creare `backend/.env` partendo da `backend/.env.sample`
- impostare `DATABASE_URL="postgresql://admin:password@db:5432/my_habix?schema=public"`

Dalla cartella corrente eseguire:
`docker compose -f ./compose.dev.yml up -d`

Una volta inizializzati i containers saranno disponibili i seguenti endpoints: 
- frontend: http://localhost:3000/
- backend: http://localhost:3001/
- prisma studio: http://localhost:5555/