# API

## 1. 회원가입 API

> 입력받은 data로 User를 생성한다.

### URL

http://localhost:4000/auth/register/local


### Method

POST

### DataParams

| key           | Description   | Type    |
| :------------ | :-----------: | ------: |
| username      | 유저명         | string  |
| email         | 이메일         | string  |
| password      | 비밀번호       | string  |


### Success Response

* HTTP Status code 201

* response
    ```javascript
    { 
       user: {
            id: 유저의 uuid값,
            username: 유저의 유저명,
            password: 유저의 비밀번호
       },
        token: jwt 토큰값
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
                {
                    "message": "\" must be a valid email",
                    "path": [
                        ""
                    ],
                    "type": "",
                    "context": {
                        "value": "",
                        "key": "",
                        "label": ""
                    }
                }
            ],
            "_object": {
                "username": "",
                "email": "",
                "password": ""
            }
        }
    ```
* HTTP Status code 409
    ```javascript
        {
            name: 'DUPLICATED_ACCOUNT',
            payload: 'email' 또는 'username'
        }
    ```
* HTTP Status code 500
    ```javascript
        데이터베이스 오류 및 서버에러
    ```



## 2. 로그인 API

> 입력받은 data로 로그인을 한다.

### URL

http://localhost:4000/auth/login/local


### Method

POST

### DataParams

| key           | Description   | Type    |
| :------------ | :-----------: | ------: |
| email         | 이메일         | string  |
| password      | 비밀번호       | string  |


### Success Response

* HTTP Status code 201

* response
    ```javascript
    { 
       user: {
            id: 유저의 uuid값,
            username: 유저의 유저명,
            password: 유저의 비밀번호
       },
        token: jwt 토큰값
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
                {
                    "message": "\" must be a valid email",
                    "path": [
                        ""
                    ],
                    "type": "",
                    "context": {
                        "value": "",
                        "key": "",
                        "label": ""
                    }
                }
            ],
            "_object": {
                "username": "",
                "email": "",
                "password": ""
            }
        }
    ```
* HTTP Status code 409
    ```javascript
        {
            name: 'ERROR EXIST',
            payload:  '계정을 찾을 수 없습니다.' 또는 '비밀 번호가 일치하지 않습니다.'
        }
    ```
* HTTP Status code 500
    ```javascript
        데이터베이스 오류 및 서버에러
    ```


## 3. 로그아웃 API

> 세션(토큰) 값을 없애서 로그아웃 처리를 한다.

### URL

http://localhost:4000/auth/logout


### Method

POST

### Success Response

* HTTP Status code 204
