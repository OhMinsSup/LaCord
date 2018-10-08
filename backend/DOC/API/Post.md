# POST API 

## 1. 포스트 작성 API

> 입력받은 data로 Post를 생성한다.

### URL

http://localhost:4000/post


### Method

POST

### DataParams

| key           | Description   | Type    |
| :------------ | :-----------: | ------: |
| title         | 제목          | string  |
| body          | 내용            string  |
| tags          | 연관 태그      | string[]|
| post_thumbnail| 메인 사진      | string?  |


### Success Response

* HTTP Status code 201

* response
    ```javascript
    { 
        id,
        post_thumbnail,
        title,
        body,
        created_at,
        tags,
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
                "title": "",
                "body": "",
                "tags": ""
                "post_thumbnail": "",
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

## 2. 포스트 업데이트 API

> 입력받은 data로 Post를 업데이트한다.

### URL

http://localhost:4000/post/:id


### Method

Patch

### DataParams

| key           | Description   | Type    |
| :------------ | :-----------: | ------: |
| title         | 제목          | string  |
| body          | 내용            string  |
| tags          | 연관 태그      | string[]|
| post_thumbnail| 메인 사진      | string?|
| id            | 포스트 ID      | string | 



### Success Response

* HTTP Status code 201

* response
    ```javascript
    { 
        id,
        post_thumbnail,
        title,
        body,
        created_at,
        tags,
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
                "title": "",
                "body": "",
                "tags": ""
                "post_thumbnail": "",
            }
        }
    ```

    존재하지 않는 포스트를 업데이트 할 때
    ```javascript 
        status = 404
    ```
* HTTP Status code 409 
    로그인 하지 않을 때
    ```javascript
        status = 409;
    ```

* HTTP Status code 500
    ```javascript
        데이터베이스 오류 및 서버에러
    ```

* 예상할 수 있는 에러
    - serializePost에서 값을 가져올때 존재하지 않는 값을 가져올 경우
    - 문법을 잘못 작성해서 발생하는 오류
    - 각 모델의 관계를 제대로 정의하지 않을 경우


## 3. 포스트 삭제 API

> 입력받은 data로 Post를 삭제한다.

### URL

http://localhost:4000/post/:id


### Method

Delete

### DataParams

| key           | Description   | Type    |
| :------------ | :-----------: | ------: |
| id            | 포스트 ID      | string | 



### Success Response

* HTTP Status code 201

* response
    ```javascript
    { 
        ctx.status = 204;
    }
    ```

### Error response

* HTTP Status code 404
    존재하지 않는 포스트를 업데이트 할 때
    ```javascript 
        status = 404
    ```
* HTTP Status code 409 
    로그인 하지 않을 때
    ```javascript
        status = 409;
    ```

* HTTP Status code 500
    ```javascript
        데이터베이스 오류 및 서버에러
    ```

* 예상할 수 있는 에러
    - 문법을 잘못 작성해서 발생하는 오류
    - 각 모델의 관계를 제대로 정의하지 않을 경우
    - 삭제 할 때 관계된 데이터를 먼저 삭제하지 않고 포스트 테이블을 먼저 삭제할 경우