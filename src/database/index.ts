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

    console.log('Tables initialized');
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
    let result = await db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?);',
        [name, email, password],
      );
    });

    return result;
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

// Add a transaction for a user
export const addTransaction = async (
  userId: number,
  amount: number,
  description: string,
  date: string,
) => {
  try {
    await db.executeSql(
      'INSERT INTO transactions (userId, amount, description, date) VALUES (?, ?, ?, ?);',
      [userId, amount, description, date],
    );
    return true;
  } catch (error) {
    console.error('Transaction Error:', error);
    return false;
  }
};

export const getUserTransactions = async (userId: number) => {
  try {
    const result = await db.executeSql(
      'SELECT * FROM transactions WHERE userId = ? ORDER BY date DESC;',
      [userId],
    );

    let transactions = [];
    for (let i = 0; i < result[0].rows.length; i++) {
      transactions.push(result[0].rows.item(i));
    }
    return transactions;
  } catch (error) {
    console.error('Fetch Transactions Error:', error);
    return [];
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
