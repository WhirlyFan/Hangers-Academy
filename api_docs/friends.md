## Friends

### Get all friends by current user

- Require Authentication: True

- Request

  - Method: GET
  - URL: /api/friends
  - Body: None

- Successful Response

  - Status code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

  ```json
  {
    "Friends": [
      {
        "id": 1,
        "user_id": 1,
        "friend_id": "2",
        "created_at": "2021-11-19 20:39:36",
        "updated_at": "2021-11-19 20:39:36"
      }
    ]
  }
  ```

### Add a friend

Creates and returns a new friend

- Require Authentication: True
- Require Authorization: True
- Request

  - Method: POST
  - URL: /api/friends
  - Headers:
    - Content-Type: application/json
  - Body:

  ```json
  {
    "friend_id": 2
  }
  ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

  ```json
  {
    "Friends": [
      {
        "id": 1,
        "user_id": 1,
        "friend_id": "2",
        "created_at": "2021-11-19 20:39:36",
        "updated_at": "2021-11-19 20:39:36"
      }
    ]
  }
  ```

* Error response: Couldn't find a friend with the specified id

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

  ```json
  {
    "message": "Friend couldn't be found",
    "status_code": 401
  }
  ```

* Error response: You cannot add yourself as a friend

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

  ```json
  {
    "message": "You cannot add yourself as a friend",
    "status_code": 401
  }
  ```

* Error response: This user is already in your friends list

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

  ```json
  {
    "message": "This user is already in your friends list",
    "status_code": 401
  }
  ```

### Delete a friend

- Require Authentication: True
- Require Authorization: True
- Request

  - Method: DELETE
  - URL: /api/friends/:friends_id
  - Headers:
    - Content-Type: application/json
  - Body: None

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

  ```json
  {
    "message": "Successfully deleted friend",
    "status_code": 200
  }
  ```

* Error response: Couldn't find a friend with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

  ```json
  {
    "message": "Friend couldn't be found",
    "status_code": 404
  }
  ```
