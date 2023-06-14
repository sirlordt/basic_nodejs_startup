require( 'dotenv' ).config(); //Read the .env file, in the root folder of project

const debug = require( 'debug' )( 'index' );

async function main() {

  let debugMark = debug.extend( "42587CAC0782" );

  debugMark( "Hello" );
  console.log( "Hello" ); //Not much usefull in very long apps

}

main();
