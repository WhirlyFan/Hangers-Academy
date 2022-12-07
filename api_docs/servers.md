## Servers
### Get all servers (may not use)
* Request
    * Method: GET
    * URL: /api/servers
    * Body: None

* Successful Response
    * Status code: 200
    * Headers: 
        * Content-Type: application/json
    * Body:

    ```json
    {
        "Servers": [
            {
                "id": 1,
                "owner_id": 1,
                "name": "AA Hangers",
                "private": "false",
                "server_img": "image url",
                "created_at": "2021-11-19 20:39:36",
                "updated_at": "2021-11-19 20:39:36",
            }
        ]
    }
    ```

### Get all public servers for current user
* Require Authentication: True
* Request
    * Method: GET
    * URL: /api/servers/current
    * Body: None

* Successful Response
    * Status code: 200
    * Headers: 
        * Content-Type: application/json
    * Body:

    ```json
    {
        "Servers": [
            {
                "id": 1,
                "owner_id": 1,
                "name": "AA Hangers",
                "private": "false",
                "server_img": "image url",
                "created_at": "2021-11-19 20:39:36",
                "updated_at": "2021-11-19 20:39:36",
            }
        ]
    }
    ```

### Get server details by server id

Returns the details of a server specified by its id

* Require Authentication: True
* Request
    * Method: GET
    * URL: /api/servers/:id
    * Body: None

* Successful Response
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:

    ```json
    {
        "id": 1,
        "owner_id": 1,
        "name": "AA Hangers",
        "private": "false",
        "server_img": "image url",
        "created_at": "2021-11-19 20:39:36",
        "updated_at": "2021-11-19 20:39:36",
        "channels": [
            {
                "id": 1,
                "name": "general",
                "channel_messages": [
                    {
                        "id": 1,
                        "message_content": "this is message",
                        "user_id": 1
                    }
                ]
            }
        ],
        "users": [
            {
                "id": 1,
                "username": "WhirlyFan",
                "status": "online",
                "custom_status": "WhirlyFan's number 1 fan",
                "profile_picture": "youareL"
            }
        ]
    }
    ```

* Error response: Couldn't find a Server with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Server couldn't be found",
      "statusCode": 404
    }
    ```

### Create a server

Creates and returns a new server

* Require Authentication: True
* Request
    * Method: POST
    * URL: /api/servers
    * Headers:
        * Content-Type: application/json
    * Body: 

    ```json
    {
        "name": "AA Hangers",
        "private": "false",
        "server_img": "url"
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
  {
    "id": 1,
    "owner_id": 1,
    "name": "AA Hangers",
    "private": "false",
    "server_img": "image url",
    "created_at": "2021-11-19 20:39:36",
    "updated_at": "2021-11-19 20:39:36",
  }
  ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "name": "Street address is required",
        "private": "City is required",
        "server_img": "State is required"
      }
    }
    ```

    # THIS IS MY CHANGe
