# Pictogrammers API

## Endpoint Conventions

- Always use the plural form of the noun in the URL.

  ```text
  WRONG: /icon/:iconName
  RIGHT: /icons/:iconName
  ```

- Keep one endpoint to a file. Group endpoints by noun in folders.

  ```text
  endpoints/contributors/getContributors.ts
  endpoints/contributors/postContributors.ts
  ```

- When an endpoint is reliant on a parameter, include the parameter in the file name.

  ```text
  endpoints/contributors/getContributorById.ts
  endpoints/contributors/getContributorByName.ts
  ```

## Model Conventions

- Keep one record retrieval action to a file. Group retrievals by table name in folders.

  ```text
  model/user/getUserRecords.ts
  model/user/getUserRecordById.ts
  ```

- When there a multiple record retrievals that vary by a parameter, include the parameter in the file name. You may omit the parameter in the file name for the default lookup parameter. You may omit the parameter in the file name if it is the only way to lookup a record.

  ```text
  model/icon/getIcon.ts
  model/icon/getIconById.ts
  model/tag/getTag.ts
  ```

## Lib Conventions

If there is code that is reused between multiple endpoints or models, place it in the `lib` folder. *Do not* include database actions or Fastify replies directly from lib functions.

## Middleware Conventions

Middleware functions should be stored in the `middleware` folder. If there are common checks for an endpoint, such as verifying user permissions, utilize middleware instead of repeating code in individual endpoints or relying on `lib` functions.
