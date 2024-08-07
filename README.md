

# URL Shortener

This app allows users to register, log in, and shorten URLs. It is live at [https://gurucool-url.onrender.com](https://gurucool-url.onrender.com).



## Endpoints Request Body And Response Structure

### User Routes

- **Sign Up**
  - **POST /user/SignUp**
  - **Body:** `{ "username": "string", "email": "string", "password": "string" }`
  - **Responses:**
    - **Success:** 
      ```json
      {
        "msg": "Registration Successful"
      }
      ```
    - **User Already Present:** 
      ```json
      {
        "msg": "user already present You can directly Login"
      }
      ```

- **Login**
  - **POST /user/Login**
  - **Body:** 
    - `{ "username": "string", "password": "string" }` 
    - OR 
    - `{ "email": "string", "password": "string" }`
  - **Responses:**
    - **Success:** 
      ```json
      {
        "msg": "Login Successful",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI2NmIzNzA4YWYyMDI4MzlhMDYzMmUxNzUiLCJpYXQiOjE3MjMwMzU3OTUsImV4cCI6MTcyMzAzOTM5NX0.xpA8qVNGQ_4OLkItC7l0pW-4E2w_Zt9j_U2Vi_yXh38",
        "isUser": {
          "_id": "66b3708af202839a0632e175",
          "username": "john_doe",
          "email": "john.doe1@example.com",
          "password": "$2b$05$8YFz6tnNhd0c7EJJrVuP9OqmFH3klZ/sGlx4sIWq0YCSIK9IiAN1G",
          "__v": 0
        }
      }
      ```
    - **Invalid Credentials:** 
      ```json
      {
        "msg": "invalid credentials"
      }
      ```

### URL Routes

- **Create Short URL**
  - **POST /url/add**
  - **Body:** `{ "url": "string" }`
  - **Responses:**
    - **Success:** 
      ```json
      {
        "msg": "Shorturl created",
        "shortUrl": "https://gurucool-url.onrender.com/url/6sJyoSHAv",
        "originalUrl": "https://docs.imperva.com/bundle/on-premises-knowledgebase-reference-guide/page/abnormally_long_url.htm"
      }
      ```
    - **URL Already Shortened:** 
      ```json
      {
        "msg": "This URL has already been shortened before",
        "urlPresent": {
          "_id": "66b37305f202839a0632e17e",
          "shortUrl": "https://gurucool-url.onrender.com/url/6sJyoSHAv",
          "originalUrl": "https://docs.imperva.com/bundle/on-premises-knowledgebase-reference-guide/page/abnormally_long_url.htm",
          "__v": 0
        }
      }
      ```

- **Redirect Short URL**
  - **GET /url/:shortId**
  - **Response:** Redirects to the original URL.

