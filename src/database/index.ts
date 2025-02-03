import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);

const db = SQLite.openDatabase(
  {name: 'expense_tracker.db', location: 'default'},
  () => {},
  error => {
    console.error(error);
    throw Error('Could not connect to database');
  },
);

export const initDB = async () => {
  try {
    await db.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          email TEXT UNIQUE,
          password TEXT
        );`,
    );

    await db.executeSql(
      `CREATE TABLE IF NOT EXISTS transactions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userId INTEGER,
          amount REAL,
          description TEXT,
          date TEXT,
          FOREIGN KEY(userId) REFERENCES users(id)
        );`,
    );
  } catch (error) {
    console.error('DB Init Error:', error);
  }
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    let userId: number | null = null;

    await new Promise<void>((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO users (name, email, password) VALUES (?, ?, ?);',
          [name, email, password],
          (tx, results) => {
            if (results.insertId) {
              userId = results.insertId;
              resolve();
            } else {
              reject(new Error('User registration failed'));
            }
          },
          (tx, error) => reject(error),
        );
      });
    });

    return userId ? {id: userId, name, email} : null;
  } catch (error) {
    console.error('Register Error:', error);
    return null;
  }
};
export const loginUser = async (email: string, password: string) => {
  try {
    let result: any = await new Promise((resolve, reject) => {
      db.readTransaction(tx => {
        tx.executeSql(
          'SELECT * FROM users WHERE email = ? AND password = ?;',
          [email, password],
          (tx, results) => resolve(results),
          (tx, error) => reject(error),
        );
      });
    });

    return result.rows.item(0);
  } catch (error) {
    console.error('Login Error:', error);
    return null;
  }
};
export const addTransaction = async (
  userId: number,
  amount: number,
  description: string,
  date: string,
) => {
  try {
    const result: any = await new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO transactions (userId, amount, description, date) VALUES (?, ?, ?, ?);',
          [userId, amount, description, date],
          (tx, results) => {
            const insertedId = results.insertId;
            if (insertedId) {
              resolve({success: true, insertedId});
            } else {
              reject(new Error('Transaction insert failed'));
            }
          },
          (tx, error) => reject(error),
        );
      });
    });

    return result;
  } catch (error) {
    console.error('Transaction Error:', error);
    return {success: false, error: error.message};
  }
};

export const getUserTransactions = async (userId: number) => {
  try {
    // Get the result of the SQL query
    const result = await new Promise<any>((resolve, reject) => {
      db.readTransaction(tx => {
        tx.executeSql(
          'SELECT * FROM transactions WHERE userId = ? ORDER BY date DESC;',
          [userId],
          (tx, results) => resolve(results), // resolve with results
          (tx, error) => reject(error), // reject on error
        );
      });
    });

    // Create an empty array to store transactions
    let transactions: any[] = [];

    // Loop through the rows returned by the query
    for (let i = 0; i < result.rows.length; i++) {
      transactions.push(result.rows.item(i));
    }

    return transactions; // Return the transactions
  } catch (error) {
    console.error('Fetch Transactions Error:', error);
    return []; // Return an empty array if an error occurs
  }
};

export const deleteTransactionFromDB = async (transactionId: number) => {
  try {
    await db.executeSql('DELETE FROM transactions WHERE id = ?;', [
      transactionId,
    ]);
    return true;
  } catch (error) {
    console.error('Delete Transaction Error:', error);
    return false;
  }
};

// Update a transaction in the database
export const updateTransactionInDB = async (
  id: number,
  amount: number,
  description: string,
  date: Date,
) => {
  try {
    await db.executeSql(
      'UPDATE transactions SET amount = ?, description = ?, date = ? WHERE id = ?;',
      [amount, description, date, id],
    );
    return true;
  } catch (error) {
    console.error('Update Transaction Error:', error);
    return false;
  }
};
