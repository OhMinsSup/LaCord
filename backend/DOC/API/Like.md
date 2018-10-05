# LIKE API 

## 1. LIKE API

> 유저ID값과 포스트ID값을 주면 해당 포스트를 like한다.

### URL

http://localhost:4000/post/:id/like


### Method

POST

### DataParams

| key           | Description   | Type    |
| :------------ | :-----------: | ------: |
| id            | 포스트 ID     | string  |

### Success Response

* HTTP Status code 201

* response
    ```javascript
    { 
        likes: 현재 Like의 갯수,
        liked: like면 true,
    }
    ```

### Error response

* HTTP Status code 404
    
    데이터 파라미터 유효성 검사
    ```javascript
        // 포스트가 존재하지 않았을 경우
        {   
            ctx.status = 404;
            ctx.body = {
                name: '존재하지 않는 포스트'
            }
        }
    ```

    ```javascript
        // 유저가 존재하지 않았을 경우
        {   
            ctx.status = 404;
            ctx.body = {
                name: '존재하지 않는 유저'
            }
        }
    ```
* HTTP Status code 409
    ```javascript
        // 이미 해당 포스트에 좋아요를 했는데 또 한 경우
        {
            ctx.status = 409;
            ctx.body = {
                name: '이미 좋아요 하였습니다.',
            };
        }
    ```

* HTTP Status code 500
    ```javascript
        데이터베이스 오류 및 서버에러
    ```

## 2. UNLIKE API

> 유저ID값과 포스트ID값을 주면 해당 포스트를 unlike한다.

### URL

http://localhost:4000/post/:id/like


### Method

DELETE

### DataParams

| key           | Description   | Type    |
| :------------ | :-----------: | ------: |
| id            | 포스트 ID     | string  |

### Success Response

* HTTP Status code 201

* response
    ```javascript
    { 
        likes: 현재 Like의 갯수,
        liked: like면 true,
    }
    ```

### Error response

* HTTP Status code 404
    
    데이터 파라미터 유효성 검사
    ```javascript
        // 포스트가 존재하지 않았을 경우
        {   
            ctx.status = 404;
            ctx.body = {
                name: '존재하지 않는 포스트'
            }
        }
    ```

    ```javascript
        // 유저가 존재하지 않았을 경우
        {   
            ctx.status = 404;
            ctx.body = {
                name: '존재하지 않는 유저'
            }
        }
    ```
* HTTP Status code 409
    ```javascript
        // 해당 포스트에 좋아요를 하지 않았는데 unlike를 한 경우
        {
            ctx.status = 409;
            ctx.body = {
                name: '좋아요 하지 않았습니다',
            };
        }
    ```

* HTTP Status code 500
    ```javascript
        데이터베이스 오류 및 서버에러
    ```

## 3. GETLIKE API

> 유저ID값과 포스트ID값을 주면 해당 포스트의 like 상태와 갯수를 체크한다.

### URL

http://localhost:4000/post/:id/like


### Method

GET

### DataParams

| key           | Description   | Type    |
| :------------ | :-----------: | ------: |
| id            | 포스트 ID     | string  |

### Success Response

* HTTP Status code 201

* response
    ```javascript
    { 
        likes: 현재 Like의 갯수,
        liked: like면 true,
    }
    ```

### Error response

* HTTP Status code 404
    
    데이터 파라미터 유효성 검사
    ```javascript
        // 포스트가 존재하지 않았을 경우
        {   
            ctx.status = 404;
            ctx.body = {
                name: '존재하지 않는 포스트'
            }
        }
    ```

* HTTP Status code 500
    ```javascript
        데이터베이스 오류 및 서버에러
    ```

