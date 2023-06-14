require( 'dotenv' ).config(); //Read the .env file, in the root folder of project

import readline from "readline";

import util from 'util';

import mysql from 'mysql';

const debug = require( 'debug' )( 'index' );

let start = process.hrtime();

function elapsedTime( strNote: string ){

  const precision = 3; // 3 decimal places
  const elapsed = process.hrtime( start )[ 1 ] / 1000000; // divide by a million to get nano to milli
  console.log( process.hrtime( start )[ 0 ] + " s, " + elapsed.toFixed( precision ) + " ms - " + strNote ); // print message + time
  start = process.hrtime(); // reset the timer

}

async function keypress() {

  const strMark = "2C6BF2B465AC";

  const debugMark = debug.extend( strMark );

  debugMark( "Press any key to continue" );

  process.stdin.setRawMode(true)

  return new Promise( ( resolve ) => process.stdin.once( 'data', () => {

    process.stdin.setRawMode(false)
    resolve( true );

  } ) );


  // await new Promise( ( resolve: any, reject: any ) => {

    // const rl = readline.createInterface( {
    //                                        input: process.stdin,
    //                                        output: process.stdout
    //                                      } );

    // rl.question( "Press any key to continue", function saveInput( key: string ) {

    //   //rl.close();
    //   resolve( true );

    // });

    // rl.on( "close", function saveInput() {

    //   //console.log("\nBYE BYE !!!");
    //   //process.exit(0);

    // });

  //} );

}

function connectToDb( config: any ) {

  const connection = mysql.createConnection( config );

  return {

    query( sql: any, args: any ) {

      return util.promisify( connection.query )
                 .call( connection, sql, args );

    },
    close() {

      return util.promisify( connection.end )
                 .call( connection );

    }

  };

}

async function main() {

  try {

    let debugMark = debug.extend( "42587CAC0782" );

    debugMark( "Begin of program" );

    // const connection = mysql.createConnection( {
    //                                            host     : 'localhost',
    //                                            user     : 'root',
    //                                            password : 'dsistemas',
    //                                            database : 'OdinV2DB'
    //                                          });


    //  std::cout << "Begin of program" << std::endl;

    //console.log( "Hello" ); //Not much usefull in very long apps

    await keypress();

    const connection = connectToDb( {
                                  host     : 'localhost',
                                  user     : 'root',
                                  password : 'dsistemas',
                                  database : 'OdinV2DB'
                                } );

    debugMark( "Connected to database" );

    await keypress();

    start = process.hrtime();

    debugMark( "Before select rows" );

    const rows = await connection.query( 'Select * From bizDriverPosition', null );

    for ( let intIndex = 0; intIndex < rows.length; intIndex++ ) {

      debugMark( "%O", rows[ intIndex ] );

    }

    elapsedTime( "Showed " + rows.length + " rows" );
    await keypress();

    // connection.query( 'Select * From bizDriverPosition', async ( error: any, results: any, fields: any ) => {

    //   if ( error ) { //throw error;

    //     debugMark( "%O", error );

    //     //await keypress();

    //   }
    //   else {

    //     elapsedTime( "Selected " + results.length + " rows" );

    //     start = process.hrtime();

    //     //await keypress();

    //     for ( let intIndex = 0; intIndex < results.length; intIndex++ ) {

    //       debugMark( "%O", results[ intIndex ] );

    //     }

    //     elapsedTime( "Showed " + results.length + " rows" );
    //     await keypress();

    //   }


    //   //console.log('The solution is: ', results[0].solution);

    // });

    connection.close();

    process.exit( 0 );

  }
  catch ( error: any ) {

    const strMark = "CF32E88EB366";

    const debugMark = debug.extend( strMark );

    debugMark( "Error message: [%s]", error.message ? error.message : "No error message available" );

  }

}

main();
