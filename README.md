# Initial Setup

## Client Setup

In a `.env` file at the root of the repository, add the following line:

```
REACT_NATIVE_PACKAGER_HOSTNAME=YOUR_LOCAL_IP_ADDRESS
```

This is needed so that Expo can find your machine since the docker
container will by default expose the container's IP instead of your
development machine's IP address.

## Checkout The Web Client

```
http://localhost:8000
```

## Checkout the Native Client

Run `docker-compose logs native` and scan the QR code in the logs.

### Useful Commands

The following command generates the an OpenAPI schema. The schema must be regenerated every time new endpoints are added or any of the existing endpoints are altered. The CI/CD GitHub actions will test whether or not the existing document matches the current API. If the openapi-schema-check fails, the OpenAPI schema must be regenereated.
```docker-compose run --rm --no-deps backend ./manage generateschema --format openapi-json --file v1-schema.json```
