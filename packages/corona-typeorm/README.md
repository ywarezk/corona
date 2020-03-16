# corona-typeorm

The typeorm models that represent our db table will be in this package.

## What will our database look like?

Users
id - primary key
uid - varchar / string
isSick - bool

Locations
id - primary key
latitude - number
longitude - number
time - number timestamp
userId - number

one to many
one user to many location