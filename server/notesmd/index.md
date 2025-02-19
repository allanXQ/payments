send mail/sms if there is an issue with the webhook

create app data fields
appname
appid
accountnumber
type: enum[till, paybill, phonenumber]

b2b transactions backend api to deposit to till/paybill
b2c to deposit to phone number
c2b to deposit to my account

worflow
Application triggers stk push by sending a request to tinywebhook api. it must contain its application id, amount,phonenumber
tinywebhook then generates mpesa stk push using the daraja api
it saves merchant request id with the id of the application
tinywebhook sends stkpush data to the client
the client saves the transaction details
when the callbak request comes, tinywebhook checks the db for the merchant id and gets the name of the client application.
it then send the callback to the right application
