# fxhash Indexer & Front-End Interface

This project is designed to index the transactions on the `mint_issuer` entry point of the Smart Contract used by fxhash. Additionally, it displays the latest indexed projects published by artists on fxhash.

## Setup and Running

This project uses Docker for easy setup and running.

`docker-compose up -d`

This will setup all required services in individual containers, install all dependencies and start the application.

Visit [http://localhost:3000](http://localhost:3000) to view the front-end interface.

## Containerized services

- `indexer-fe`: Simple React/NextJS front-end
- `indexer-be`: Module responsible for indexing blockchain transactions
- `graphql-api`: GraphQL API exposing the projects table
- `postgres`: PostgreSQL object-relational database system

## Technologies Used

- [NextJS](https://nextjs.org/)
- [Postgres](https://www.postgresql.org/)
- [GraphQL API](https://graphql.org/)
- [Docker](https://www.docker.com/)

## Related Documentation

- [fxhash](https://www.fxhash.xyz/doc)
- [tzkt api](https://api.tzkt.io/)
