## WB Challenge

### To run the project:

```
docker-compose up
```

To run the application container on port 3000, once you have Docker previously installed and running on your machine

### GET api/pix/pendent-transactions

Returns the pendent transactions list

```
[
{
"customerID": "f8358dc6-8c89-4df1-9d2e-120a137aadd5",
"email": "aaronhand@ratke.name",
"key": "976.565.843-06",
"value": 4731.29,
"bank": null
},
{
"customerID": "d9b307fd-3e3c-4924-a1ff-ac7eb334cd3c",
"email": "abbiehuel@thiel.net",
"key": "+55 41 13036-6576",
"value": 816.7,
"bank": null
},
{
"customerID": "7a57e3fb-1923-46f4-aa2b-5ecd1a76ab12",
"email": "addisonratke@hermiston.biz",
"key": "393.090.703-76",
"value": 5198.22,
"bank": null
},
]
```

### GET /api/pix/banks-info

Returns the bank informations list

```
[
{
"bank": "Will Bank",
"customers": [...]
},
{
"bank": "DBZ Bank",
"customers": [...]
}
]
```

### POST /api/pix/send-transaction

Resends a customer's transaction using their email

#### Necessary fields:

- Costumer's email

```
//request example

"email": "sheridancrist@lemke.info"
```

Positive response:

```
//it means success
HTTP status 200
```

Negative responses:

```
//it means the email was not found

HTTP status 404
```

```
//it means the costumer don't have enough balance

Insuficcient Funds
```

```
//it means the pix key is invalid (not an email, phone number or cpf)

Invalid Key
```
