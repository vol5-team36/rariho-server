# managements api

## スキルセットの登録 API

```
POST /api/skills
```

| param         | type   | description                        |
| ------------- | ------ | ---------------------------------- |
| skills[].name | string | スキル名                           |
| skills[].type | string | タイプ ('language' or 'framework') |

```javascript
{
    "skills": [
        {
            "name": string,
            "type": string,
        }
        ...
    ]
}
```

## スキルセットの削除 API

```
DELETE /api/skills/{skill_id}
```

### レスポンス

#### 成功時

204 NoContent
