# git
### Log
git log --oneline --graph

### Rewriting the most recent commit message
git commit --amend
Then edit the text file

### Amending older or multiple commit messages
git rebase -i HEAD~n
Then edit the text file

### Rename branches in Git local and remote
git branch -m new-name (If you are on the branch you want to rename)
or, git branch -m old-name new-name (If you are on a different branch)
git push origin :old-name new-name
git push origin -u new-name

### remove last commit
git reset --soft HEAD~1
--soft -> 
preserve changes done to your files
Git is instructed not to modify the files in the working directory or in the index at all

git reset --hard HEAD~1
--hard ->
changes will be removed from the working directory and from the index, you will lose all modifications

git reset --mixed HEAD~1
--mixed ->
keep changes in the working directory but NOT in the index

### Undo Last Commit with revert
git revert HEAD
it will record a new commit with the changes introducted by reverting the last commit

# Node
### Note (chunk)
Node handles all the request by dividing the message body into chunk. This chunk can be notice in complex or big data like downloading files. Node doesn't know in advance how complex or big the data is, so it devide all incomming request into smaller portion no matter the request contain big or small amount of data.

### Buffer
A buffer is simply a construct which allows you to hold multiple chunks and work with them before the are released.

buffer is like bus stop where bus (chunk of data stream) can be track.
buffer is a construct which allows you to hold multiple chunks (request header data)
and work with them (on the fly) before they are released.

### req.on()
on() allow us to listen certain events ex: close, data, end, error, readable event etc.

on() allows us to listen to certain events.
the data event will be fired whenever a new chunk is ready to be read
helping by the buffer thing.

stream -> req body 1, req body 2, ... -> fully parsed
parse -> resolve (a sentence) into its component parts and describe their syntactic roles

### req.on('end', callback)
end event execute after finish parsing full incoming req from data event.
here is the bus stop, the buffer for the chunk (bus).
the bus (chunk data) is now waiting in the bus stop (buffer).

nodejs doen't immedietly run the funtion of the end event or any other event.
instead when it first encounters the first line it will simply add new event listener internally.
nodejs have some internal registry of events and listener to these events.

### node default modules:
http -> Launch a server, send requests
https -> Launch a SSL server
fs
path
os

### http.createServer()
Argument of createServer is a function called requestListener.This function will execute for every incomming request.
Function return a server

### process.exit()
use to unregister or quit the server

### Note
after register end event nodejs execute this lines without executing the listener of end event.
so Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client.
above error occur when execute the end event listener after the below code.
the contradiction happend for executing setHeader again on the listener.
to avoid this contradiction we need to add return statement on res.on('end) event to finish it completely and move to below code.

```javascript
res.setHeader('Content-Type', 'text/html');
res.write('<html>');
res.write('<head><title>Outside</title></head>');
res.write('<body><h1>Hello from server!</h1></body>');
res.write('</html>');
res.end();
```

### Note
write meta info
status code : 302 -> redirection
res.writeHead(status code, reason, header object);

### The below three line has two important implications:
1. sending the response doesn't mean that our 'end' event listeners are dead
they will still execute even if the response is already gone
2. if we do something in the event listener that should influence the response
then this is the wrong way of setting it up.

So, we should move the response code into the event listener

```javascript
res.statusCode = 302;
res.setHeader('Location', '/');
return res.end();
```

### Block Code
syncronous code block next code execution untill the file is created.it become a problem for big files.
Synchronously writes data to a file, replacing the file if it already exists.

```javascript
fs.writeFileSync('message.txt', message);
```

### Non-Blocking Code
Asynchronously writes data to a file, replacing the file if it already exists.This approach never block the code or server.

```javascript
fs.writeFile('message.txt', message, (err) => {
    // this response should only be sent if we're done working with the file
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
});
```

### Node module system
File content actually cached by node and we can't edit it externally. So, if we somehow would define routes as an object and we tried to add a new property on the fly, this will not manupulate the original file.
So, this is basically locked and not accessible from outside.
We can only export stuff that we can read from outside.
