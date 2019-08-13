# Testing Documentation

This contains the regression testing for the Execute Backend project

## Unit Tests

*No unit tests for this project yet.*

## Manual Tests

### Database

1. Logging in with *User* account should have access to read and write to the database
2. Logging in with incorrect user details should not give any access to the database.

### API

1. The `/graphql` endpoint should give access to GraphiQL and its documentation.
2. The clients application should be able to POST GraphQL queries to the endpoint and get back results.
3. The clients application should be able to POST GraphQL mutations to the endpoint and edit or add new data.