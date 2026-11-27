# HinkleSystem
=======
Hinkle is the appointment and reporting application for Lave-Auto Kimber. Its Angular 21 frontend lives in `frontend/` and its Java 21 Spring Boot backend lives in `src/main/java/`. The starter page checks application and database health.

## Build

Install JDK 21 and Node.js 24 with npm. From the repository root, run `.\gradlew.bat clean build` on Windows or `./gradlew clean build` on Linux or macOS. Gradle runs backend tests, installs locked frontend dependencies, builds Angular, and packages both layers in `build/libs/hinkle.jar`.

## Develop locally

Start Docker and run these commands in PowerShell. Compose retains the database and its initial password in a named volume.

```powershell
$env:HINKLE_DB_PASSWORD = Read-Host 'Local database password'
docker compose up -d --wait db
.\gradlew.bat bootRun --args='--spring.profiles.active=local'
```

In a second terminal run `cd frontend`, `npm ci`, and `npm start`. Open http://localhost:4200. The Angular dev server proxies health requests to Spring Boot on port 8080. Stop the servers with Ctrl+C and PostgreSQL with `docker compose down`. On Linux or macOS export the same environment variable and use `./gradlew`.

## Run the checks

| Check | Local command | What it covers |
| --- | --- | --- |
| Backend | `.\gradlew.bat test` at the root | Application health over HTTP and a database query. Uses H2 by default, PostgreSQL 17 in CI. |
| Angular | `npm ci`, `npm test`, and `npm run build` in `frontend/` | Component behavior for successful and failed connections and production compilation. |
| End-to-end | `npx playwright install chromium` and `npm run e2e` in `frontend/` | Starts the packaged application, opens Chromium, and verifies Angular displays the result of a live health check. |

For end-to-end tests, build the JAR first, start the Compose database, and set `SPRING_PROFILES_ACTIVE=local` and `HINKLE_DB_PASSWORD` in the test terminal. The test starts its own server on port 8080. For an external database set `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, and `SPRING_DATASOURCE_PASSWORD` instead.

## Continuous integration and delivery

Branch pushes and pull requests run **Backend**, **Angular**, and **End-to-end**. The browser check packages the Angular files built by the Angular job and tests the JAR against PostgreSQL 17. A successful run uploads the tested JAR. Publishing a GitHub Release runs the same checks and attaches the JAR to the release. Run it with `java -jar hinkle.jar` and the database environment variables above.

---

## Definition of Ready (DoR)

- Acceptance criteria are clearly understood by every team member.
- User stories are clearly defined and feasible.
- Dependencies are identified.
- Start and due dates are established.
- Tickets are organized by priority.
- Time estimates are realistic and justified.

---

## Definition of Done (DoD)

### Code Quality

- Code is clean, maintainable, and follows established coding standards.
- Appropriate error messages are displayed when errors occur.

### Testing

- Appropriate tests are written for all newly added functionality.
- All existing and newly added tests pass.
- End-to-end testing is performed when necessary.

### Accessibility

- User interfaces follow accessibility standards.
- Features are designed to be usable by all users.

### Internationalization & Localization (i18n & l10n)

> **Note:** These criteria apply once the internationalization and
> localization infrastructure has been implemented.

- French is the default display language.
- Users can switch between French and English.
- All user-facing text uses the established internationalization
  mechanism rather than hardcoded strings.
