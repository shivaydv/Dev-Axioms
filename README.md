# Dev Axioms

Dev Axioms is a comprehensive curriculum and documentation platform for modern web development. It provides structured learning paths, interactive coding environments, and technical interview preparation for frontend engineering.

## Architecture

The platform is built on a modern React stack:

- **Framework:** Next.js (App Router)
- **Documentation:** Fumadocs (MDX)
- **Styling:** Tailwind CSS v4
- **Database:** Prisma & Neon PostgreSQL
- **Authentication:** Better Auth
- **Editor:** Monaco Editor & Sandpack

## Local Development

### Prerequisites

- Node.js 24+
- pnpm 11+
- PostgreSQL database

### Installation

1. Clone the repository and install dependencies:

```bash
git clone https://github.com/shivaydv/Dev-Axioms.git
cd Dev-Axioms
pnpm install
```

2. Configure environment variables:

Create a `.env` file in the root directory and populate the required database and authentication variables:

```env
DATABASE_URL="postgres://..."
```

3. Initialize the database schema:

```bash
pnpm db:push
```

4. Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

## Repository Structure

- `/app`: Next.js application routes and API endpoints.
- `/components`: Shared React components and UI primitives.
- `/content`: Curriculum content authored in MDX.
- `/lib`: Shared utilities and configuration files.
- `/prisma`: Database schemas and migrations.

## License

[MIT](LICENSE)
