## Corona App

- What this app will do?

## Lesson 1

https://youtu.be/I0fWFrf_7hE


## Lesson 2

https://youtu.be/ox8GMu8Mlpw

## EX. for creating express project with GraphQL

- you need to complete the package **corona-backend**
- this package will contain our main express app.
- This app will contain a Graphql server using **apollo-server-express**
- Make sure to see my tutorial on graphql, it might help you: https://youtu.be/jVJUD6Kl8CM

- your graphql typedef should contain a type User, a type Location and a function called 
```
saveLocations(uid: String, locations: [Location])
```
- add also a test for this server.

## launch.json

add this to the launch.json in order to run mocha from your visual studio code ide

```
    {
            "type": "node",
            "request": "launch",
            "name": "Mocha Tests",
            "program": "${workspaceFolder}/node_modules/mocha/bin/_mocha",
            "env": {
                "secret": "secret"
            },
            "args": [
                "-u",
                "bdd",
                "--timeout",
                "999999",
                "--colors",
                "-r",
                "ts-node/register",
                "${workspaceFolder}/**/*.spec.ts"
            ],
            "internalConsoleOptions": "openOnSessionStart",
            "skipFiles": [
                "<node_internals>/**"
            ]
        }
```
