# API Document

## スキルセットの選択肢一覧取得 API

```
GET /api/skills
```

### レスポンス

#### 成功時

| param         | type   | description |
| ------------- | ------ | ----------- |
| skills[].id   | number | スキル ID   |
| skills[].name | string | スキル名    |

```javascript
{
    "skills": [
        {
            "id": number,
            "name": string,
        },
        ...
    ]
}
```

## プロフィール登録 API

```
POST /api/profiles
```

| param           | type   | description                                                         |
| --------------- | ------ | ------------------------------------------------------------------- |
| name            | string | 名前                                                                |
| image           | string | 画像(png, Base64 encode) <br> ex) data:image/png;base64,hogehoge... |
| github_account  | string | github のアカウント                                                 |
| twitter_account | string | twitter のアカウント                                                |
| url             | string | url                                                                 |
| comment         | string | 一言コメント                                                        |
| skills[].id     | number | スキル ID                                                           |
| skills[].order  | number | スキルの順番(0~)                                                    |
| skills[].rank   | number | スキルのランク                                                      |

```javascript
{
    "name": string,
    "image": string,
    "github_account": string,
    "twitter_account": string,
    "url": string,
    "comment": string,
    "skills": [
        {
            "id": number,
            "order": number,
            "rank": number,
        },
        ...
    ]
}
```

### レスポンス

#### 成功時

| param      | type   | description     |
| ---------- | ------ | --------------- |
| profile_id | number | プロフィール ID |

```javascript
{
    "profile_id": "string"
}
```

#### 失敗時

400 BadRequest

| param | type   | description  |
| ----- | ------ | ------------ |
| code  | string | エラーコード |

```javascript
{
    "code": InvalidParameter,
}
```

## プロフィール取得 API

```
GET /api/profiles/{profile_id}
```

| param      | type   | description     |
| ---------- | ------ | --------------- |
| profile_id | number | プロフィール ID |

### レスポンス

#### 成功時

| param           | type   | description                                                         |
| --------------- | ------ | ------------------------------------------------------------------- |
| name            | string | 名前                                                                |
| image           | string | 画像(png, Base64 encode) <br> ex) data:image/png;base64,hogehoge... |
| github_account  | string | github のアカウント                                                 |
| twitter_account | string | twitter のアカウント                                                |
| url             | string | url                                                                 |
| comment         | string | 一言コメント                                                        |
| skills[].id     | number | スキル ID                                                           |
| skills[].order  | number | スキルの順番(0~)                                                    |
| skills[].rank   | number | スキルのランク                                                      |

```javascript
{
    "name": string,
    "image": string,
    "github_account": string,
    "twitter_account": string,
    "url": string,
    "comment": string,
    "skills": [
        {
            "id": number,
            "order": number,
            "rank": number,
        },
        ...
    ]
}
```
