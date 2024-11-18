# banking-app
It's a web-based banking application

## Requirements

- **Node.js** (v16.x or higher)
- **npm** or **yarn**
- **PostgreSQL**
## Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dmmitrenko/banking-app.git
   cd banking-app
   
2. **Install dependencies:**
   ```bash
   npm install

3. **Configure the environment: Create a .env file in the root directory with the following:**
   ```bash
   DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database>
   JWT_SECRET=<your_jwt_secret>
   CURRENCY_API_KEY=<your_secret_key_from_api.currencyapi.com>
   ```

4. **Run Prisma migrations:**
   ```bash
   npx prisma migrate dev --name init

## Running the App

1. **Start the development server**:

  ```bash
  npm run start:dev
  ```

2. **Access the app**: Open http://localhost:3000 in your browser.

3. **Swagger API Docs**: Visit http://localhost:3000/api for API documentation


## Folder PATH listing
```
├───src
│   app.module.ts
│   main.ts
|
├───application
|   ├───account
|   │   │   account.module.ts
|   │   │   account.service.ts
|   │   │
|   │   └───dto
|   │           open-account-dto.ts
|   │
|   ├───admin
|   │       admin.module.ts
|   │       admin.service.ts
|   │
|   ├───auth
|   │   │   auth.module.ts
|   │   │   auth.service.ts
|   │   │
|   │   ├───dto
|   │   │       login-user-dto.ts
|   │   │       register-user-dto.ts
|   │   │
|   │   ├───guards
|   │   │       auth.guard.ts
|   │   │       role.guard.ts
|   │   │
|   │   └───strategies
|   │           jwt.strategy.ts
|   │
|   └───deposit
|       │   deposit.module.ts
|       │   deposite.service.ts
|       │
|       └───dto
|               create-deposit-offer.dto.ts
|               open-deposit-dto.ts
|
├───domain
|   │   domain.module.ts
|   │
|   ├───exceptions
|   │       user-already-exists.exception.ts
|   │
|   ├───models
|   │       account.model.ts
|   │       deposit.model.ts
|   │       user.model.ts
|   │
|   └───repositories
|           account.repository.interface.ts
|           deposit.repository.interface.ts
|           repository.interface.ts
|           transaction.repository.interface.ts
|           user.repository.interface.ts
|
├───infrastructure
|   │   infrastructure.module.ts
|   │
|   ├───api_client
|   │       currency-api-client.ts
|   │
|   └───repositories
|           account.repository.ts
|           deposit.repository.ts
|           repository.ts
|           transaction.repository.ts
|           user.repository.ts
|
├───presentation
|   ├───controllers
|   │       account.controller.ts
|   │       admin.controller.ts
|   │       auth.controller.ts
|   │       deposit.controller.ts
|   │
|   └───filters
|           user-already-exists.filter.ts
|
└───shared
    │   constants.ts
    │
    ├───configs
    │       jwt.config.ts
    ├───decorators
    │       roles.decorator.ts
    │
    └───prisma
        prisma.module.ts
        prisma.service.ts
```
