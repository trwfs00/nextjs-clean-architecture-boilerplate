# Project Structure Overview:
```
/src
  /application
    /use-cases
      /UserRegistration.ts          # Application logic like user registration
    /stores
      /userStore.ts                 # Nanostores for global state management
  /domain
    /entities
      /User.ts                      # Core domain entities like User
    /repositories
      IUserRepository.ts            # Repository interfaces defining database contracts
  /infrastructure
    /prisma
      /PrismaClient.ts              # Prisma ORM configuration for database access
    /repositories
      /PrismaUserRepository.ts      # Prisma repository implementation for user-related DB logic
    /logger
      /logger.ts                    # Winston logger setup for logging
  /presentation
    /components
      /Button.tsx                   # UI components
      /Button.stories.tsx           # Storybook documentation for components
    /pages
      /index.tsx                    # Next.js pages
      /login.tsx                    # User login/registration page
  /tests
    /unit
      /UserRegistration.test.ts     # Unit tests for use cases, repositories, etc.
    /e2e
      /user_registration.spec.ts    # E2E tests simulating real user flows
    /mocks
      /MockUserRepository.ts        # Mock repository for unit testing
  /external
    /services
      /APIClient.ts                 # External services like API clients
  /public                           # Static assets (images, icons, etc.)
  /styles                           # Global stylesheets

/.github
  /workflows
    /ci.yml                         # GitHub Actions workflow for CI/CD pipeline

/.storybook
  /main.js                          # Storybook configuration

/prisma
  schema.prisma                     # Prisma schema for defining database models

/tests                              # All unit and E2E tests

/.dockerignore                      # Docker ignore file
Dockerfile                          # Dockerfile for containerization of the application
docker-compose.yml                  # Docker Compose configuration for setting up containers
jest.config.js                      # Jest configuration for testing
stryker.conf.js                     # Stryker configuration for mutation tests
swagger.ts                          # Swagger setup for API documentation
tsconfig.json                       # TypeScript configuration
```

## Architecture: Clean Architecture Layers
### 1. Presentation Layer (UI, Pages, Components):
- This layer handles user interaction, UI components, and pages in `Next.js`.
- Responsible for rendering the interface and calling the `application layer` when necessary.
- Tools: `Storybook` for documenting UI components.
### 2. Application Layer (Use Cases, Services):
- Contains the business logic of the application, managing use cases such as `UserRegistration.ts`.
- It is the core of the system and interacts with the domain layer and infrastructure layer.
- State management with `Nanostores` happens in this layer.
- Tools: `Unit tests` to validate the correctness of use cases.
### 3. Domain Layer (Entities, Repositories):
- Contains the core domain models like User.ts and interfaces like `IUserRepository.ts`.
- Defines business rules and entities independently of any framework.
- Tools: `Unit tests` to test domain logic and repository interfaces.
### 4. Infrastructure Layer (Prisma, Repositories, Logger):
- Contains the concrete implementations of the domain repositories and external services.
- Uses `Prisma` ORM for database interactions, such as `PrismaUserRepository`.ts.
- Also includes `Winston` for logging.
- Tools: `E2E tests` ensure that infrastructure components interact correctly with the rest of the system.
### 5. External Systems:
- External services like APIs or databases are accessed via the infrastructure layer.

## Testing Integration
### Unit Tests:
- Located in `/src/tests/unit/`.
- Tests individual use cases and entities in isolation (e.g., testing `UserRegistration.ts` with a mocked repository).
- Tool: `Jest`.
### End-to-End (E2E) Tests:
- Located in `/src/tests/e2e/`.
- Simulates user actions from the front end to the back end, ensuring the entire application works as expected.
- Tool: `Cypress` or `Playwright`.
### Mutation Tests:
- `Stryker` tests the robustness of your unit tests by mutating the code and checking if the tests detect the changes.
- Configuration: `stryker.conf.js`.
- Reports help you identify weaknesses in your existing test suite.

## Tooling and Infrastructure
### 1. Logging:
- `Winston` is used for logging errors, warnings, and info messages.
- Configuration: `/src/infrastructure/logger/logger.ts`.
### 2. API Documentation (Swagger):
- `Swagger` is used to document RESTful API endpoints.
- Configuration: `/swagger.ts`.
- Accessible via `/api/docs`.
### 3. Component Documentation (Storybook):
- `Storybook` is used to visually test and document UI components.
- Configuration: `.storybook/main.js`.
### 4. State Management (Nanostores):
- `Nanostores` provides simple and small global state management.
- Store files located in `/src/application/stores/`.
### 5. Containerization (Docker Compose):
- `Docker Compose` sets up the application environment with dependencies like MySQL for Prisma.
- Configuration: `docker-compose.yml`.
- `Dockerfil`e is used to containerize the Next.js application.

## CI/CD (GitHub Actions)
- `GitHub Actions` automates the continuous integration and continuous delivery (CI/CD) pipeline.
- Located in `.github/workflows/ci.yml`.
- It runs the build, test (unit, E2E), and mutation tests automatically when code is pushed.

## Summary:
- **Clean Architecture** divides your project into distinct layers:
  - **Presentation (UI)**: Handles the user interface and interaction.
  - **Application (Use Cases)**: Manages business logic and interacts with the domain and infrastructure.
  - **Domain (Entities, Repositories)**: Defines the core business logic, independent of frameworks.
  - **Infrastructure (Database, API)**: Implements repositories and connects with external services like Prisma ORM.
  - **External Systems**: External APIs, databases, or services used by the infrastructure.

- **Testing**: Incorporates unit tests for isolated functionality, E2E tests for full flow simulation, and mutation tests to validate the quality of your test cases.
- **Tools**:
  - `Winston` for logging.
  - `Swagger` for API documentation.
  - `Storybook` for component documentation.
  - `Nanostores` for state management.
  - `Docker Compose` for containerization.
  - `GitHub Actions` for automated CI/CD.

This architecture and structure are scalable, maintainable, and follow best practices for testing and deployment, ensuring a robust development process.
