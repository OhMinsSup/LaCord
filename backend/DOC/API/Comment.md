# Comment API 

## 1. Comment 작성 API

> 입력받은 data로 Comment를 생성한다.

### URL

http://localhost:4000/post/:id/comment/


### Method

POST

### DataParams

| key           | Description   | Type    |
| :------------ | :-----------: | ------: |
| text          | 내용           | string  |
| id            | 포스트ID       | string  |



### Success Response

* HTTP Status code 201

* response
    ```javascript
    { 
        commentId,
        text
        user: {
            id,
            username,
            email,
            thumbnail,
        }
    }
    ```

### Error response

* HTTP Status code 404
    
    데이터 파라미터 유효성 검사 실패
    ```javascript
        {
            "isJoi": true,
            "name": "ValidationError",
            "details": [
                /*
                    어떤 데이터가 어떠한 오류를 내는지 알려준다.
                */
            ],
            "_object": {
                "text": "",
            }
        }
    ```

* HTTP Status code 500
    ```javascript
        데이터베이스 오류 및 서버에러,
        댓글이 작성이 안된경우,
    ```

* 예상할 수 있는 에러
    - serializePost에서 값을 가져올때 존재하지 않는 값을 가져올 경우
    - 문법을 잘못 작성해서 발생하는 오류
    - 각 모델의 관계를 제대로 정의하지 않을 경우 

## 2. Comment 수정 API

> 입력받은 data로 Comment를 수정한다.

### URL

http://localhost:4000/post/:id/comment/:commentId


### Method

PUT

### DataParams

| key           | Description   | Type    |
| :------------ | :-----------: | ------: |
| text          | 내용          | string  |
| id            | 포스트ID      | string  |
| commentId     | 댓글ID        | string  |


### Success Response

* HTTP Status code 201

* response
    ```javascript
    { 
        commentId,
        text
        user: {
            id,
            username,
            email,
            thumbnail,
        }
    }
    ```

### Error response

* HTTP Status code 404
    
    데이터 파라미터 유효성 검사 실패
    ```javascript
        {
            "isJoi": true,
            "name": "ValidationError",
            "details": [
                /*
                    어떤 데이터가 어떠한 오류를 내는지 알려준다.
                */
            ],
            "_object": {
                "text": "",
            }
        }
    ```

* HTTP Status code 500
    ```javascript
        데이터베이스 오류 및 서버에러
    ```

* 예상할 수 있는 에러
    - serializePost에서 값을 가져올때 존재하지 않는 값을 가져올 경우
    - 문법을 잘못 작성해서 발생하는 오류
    - 각 모델의 관계를 제대로 정의하지 않을 경우


## 3. Comment 삭제 API

> 입력받은 data로 Comment를 삭제한다.

### URL

http://localhost:4000/post/:id/comment/:commentId


### Method

Delete

### DataParams

| key           | Description   | Type    |
| :------------ | :-----------: | ------: |
| id            | 포스트ID      | string  |
| commentId     | 댓글ID        | string  |


### Success Response

* HTTP Status code 201

* response
    ```javascript
        ctx.status = 204
    ```

### Error response

* HTTP Status code 500
    ```javascript
        데이터베이스 오류 및 서버에러
    ```

* 예상할 수 있는 에러
    - serializePost에서 값을 가져올때 존재하지 않는 값을 가져올 경우
    - 문법을 잘못 작성해서 발생하는 오류
    - 각 모델의 관계를 제대로 정의하지 않을 경우