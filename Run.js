var http = require( 'http' );
var fs = require( 'fs' );
var path = require('path');

http.createServer( function ( req, res ){
		var contentType, filePath;
		switch ( path.extname( req.url ) ) {
			case '.html':
				contentType = 'text/html';
				filePath = __dirname + '/html' + req.url;
				break;
            case '.css':
                contentType = 'text/css';
                filePath = __dirname + req.url;
                break;
            case '.js':
                contentType = 'text/javascript';
                filePath = __dirname + req.url;
                break;
			default:
				contentType = 'text/html';
				filePath = __dirname + '/html/index.html';
				break;
		}

        fs.readFile( filePath, function ( err, data ) {

		if ( err ) {
			res.writeHead( 500 );
			res.end();
			return;
		}

		res.writeHead( 200, {'Content-Type': contentType} );
        res.write( data );
		res.end();
	});
}).listen( 8082 );
