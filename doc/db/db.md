# Database Document

## SQL

### skills

| param | type        | option   |
| ----- | ----------- | -------- |
| id    | BIGINT      | pk       |
| name  | VARCHAR(45) | NOT NULL |
| type  | VARCHAR(45) | NOT NULL |

### profiles

| param | type   | option |
| ----- | ------ | ------ |
| id    | BIGINT | pk     |

## MongoDB

### profiles

| param           | type     | description                         |
| --------------- | -------- | ----------------------------------- |
| \_id            | ObjectID | 自動生成 ID                         |
| profile_id      | number   | sql と紐付ける ID                   |
| name            | string   | 名前                                |
| github_account  | string   | github のアカウント                 |
| twitter_account | string   | twitter のアカウント                |
| url             | string   | url                                 |
| comment         | string   | 一言コメント                        |
| skills[].id     | number   | スキル ID<br>0 の場合はその他とする |
| skills[].order  | number   | スキルの順番(0~)                    |
| skills[].rank   | number   | スキルのランク                      |
| skills[].name   | string   | スキル名                            |
| skills[].type   | string   | タイプ ('language' or 'framework')  |

```javascript
{
    "_id": ObjectID,
    "profile_id": number,
    "layout_id": number,
    "name": string,
    "github_account": string,
    "twitter_account": string,
    "url": string,
    "comment": string,
    "skills": [
        {
            "id": number,
            "name": string,
            "order": number,
            "rank": number,
            "type": string,
        },
        ...
    ]
}
```
