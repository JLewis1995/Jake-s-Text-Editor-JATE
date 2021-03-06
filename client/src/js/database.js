import { openDB } from 'idb';

const initdb = async () =>
// We are creating a new database named 'contact' which will be using version 1 of the database.
console.log(`init started`);
  openDB('jate', 1, {
    // Add our database schema if it has not already been initialized.
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists(database)');
        return;
      }
      // Create a new object store for the data and give it an key name of 'id' which needs to increment automatically.
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created(database)');
    },
  });

// update function via put
export const putDb = async (content) => {
  console.log(`started put(database)`);
  // connect to database
  const jateDb = await openDB('jate', 1)
  // create transaction
  const tx = jateDb.transaction('jate', "readwrite")
  // open store
  const store = tx.objectStore('jate')
  //get request/method
  const request = store.put({ jate: content})
  //results and log
  const result = await request
  console.log('completed putDb');
  console.log('result.value', result);
  return result;
};

// get function
export const getDb = async () => {
  console.log(`started get(database)`);
  // connect to database
  const jateDb = await openDB('jate', 1)
  // create transaction
  const tx = jateDb.transaction('jate', "readonly")
  // open store
  const store = tx.objectStore('jate')
  //get request/method
  const request = store.getAll()
  //results and log
  const result = await request
  console.log('completed getDb - result is:');
  console.log(result);
};

initdb();
