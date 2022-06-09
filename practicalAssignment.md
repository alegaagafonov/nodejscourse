# Practical assigement #1

## create todo application

## prerequisites

- node.js / npm installed
- mongodb locally or atlas instance (<https://www.mongodb.com/languages/javascript/mongodb-and-npm-tutorial>)

## technology

- express.js

## functional requirements

- app can create a todo (/create)
- app can read todos (/)
- app can update todo (/update)
- app can delete todo (/delete)
- app can complete/uncomplete todo (/complete)

### notes

- todo can have an interface like this: (but it's up to you):

```
  {
    id: number,
    label: string,
    done: boolean
  }
```

- no frontend components needed, app should response with array of json objects representing todos like this:

```
[
  {
    id: 1,
    label: 'have a breakfast',
    done: false
  }
]
```

- you can use postman, curl or nbrowser's fetch to perform POST, PUT or DELETE api calls
- solutions should be pushed as branches to this repository
- you can ask questions or make suggestions about this assignment using github issues
