const http = require('http')
const fs = require('fs')
const { open } = require('fs/promises');

const port = process.env.PORT || 3000;



const server = http.createServer((req, res) => {
    console.log(req.url)
    let result = ''
    res.statusCode = 200;
    if (req.url === '/') {
        // res.write('<h1>hello</h1>')
        result = '<h1>hello</h1>'
    }
    else if (req.url === '/textsync') {
        const data = fs.readFileSync('file.txt')
        // res.write(data + '\n')
        result = data;
    }
    else if (req.url === '/textasync') {
         fs.readFile('file.txt', (err, data) => {
            // res.write(data.toString())
            result = data
        })
    }
    else if (req.url === '/textstream') {
        var data =''
        var reader = fs.createReadStream('file.txt')
        reader.setEncoding('UTF8');
        reader.on('data', function(chunk) {
            data += chunk;
         });
         
         reader.on('end',function() {
            result = data;
         });
         
         reader.on('error', function(err) {
            console.log(err.stack);
         });
         
    }
    else if (req.url === '/textpromise') {
        // try {
        //   result = await open('file.txt');
        // } finally {
        //   await filehandle?.close();
        // }

        (async function() {
            try {
                result = await open('file.txt');
              } finally {
                await filehandle?.close();
              }
          })
   }
    res.write(result)
    res.write('task done')
    res.end()
})
server.listen(port, () => {
    console.log(`server is listining on ${port}`)
})









