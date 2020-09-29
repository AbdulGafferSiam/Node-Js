This repository based on NodeJs

Note (chunk)
Node handles all the request by dividing the message body into chunk. This chunk can be notice in complex or big data like downloading files. Node doesn't know in advance how complex or big the data is, so it devide all incomming request into smaller portion no matter the request contain big or small amount of data.

Buffer
A buffer is simply a construct which allows you to hold multiple chunks and work with them before the are released.

req.on()
on() allow us to listen certain events ex: close, data, end, error, readable event etc.