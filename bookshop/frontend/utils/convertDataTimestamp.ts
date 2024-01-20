import timestampConverter from "./timestampConverter"

const testdata = {
    "user": {
        "id": "3b6002e9-d9e8-4314-b74b-e1b968aced83",
        "username": "admin",
        "email": "admin@admin.com",
        "created": "2024-01-20T07:47:51.949Z",
        "updated": "2024-01-20T07:48:37.620Z",
        "lastLoginAt": "2024-01-20T08:48:37.615Z",
        "currentLoginDuration": 0
    },
    "book": {
        "id": "3b6002e9-d9e8-4314-b74b-e1b968aced83",
        "username": "admin",
        "email": "admin@admin.com",
        "created": "2024-01-20T07:47:51.949Z",
        "updated": "2024-01-20T07:48:37.620Z",
        "lastLoginAt": "2024-01-20T08:48:37.615Z",
        "currentLoginDuration": 0
}
}




export default function convertDataTimestamp(data: any) {
  const dataArray = data.map((key: string) => {
        if (['createdAt', 'updatedAt', 'lastLoginAt'].includes(key)) {
            data[key] = timestampConverter(data[key]);
        }
    })
    return dataArray
}

console.log(convertDataTimestamp(testdata));

