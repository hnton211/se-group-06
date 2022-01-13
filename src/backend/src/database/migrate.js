const pool = require("./db");
const migrate = async () => {
  try {
    await pool.query("SELECT * FROM usertable", async (err, res) => {
      if (!err) return;
      else {
        try {
          await pool.query(
            "CREATE TABLE usertable (id serial primary key,username varchar(50), password varchar(50), email varchar(50), firstname varchar(50), lastname varchar(50));"
          );
          await pool.query(
            "INSERT INTO usertable (username, password, email, firstname, lastname) VALUES ('admin', 'admin', 'admin', 'admin', 'admin');"
          );
          await pool.query(
            "CREATE TABLE deck (id serial primary key, user_id integer REFERENCES usertable(id), deck_name varchar(50))"
          );
          await pool.query(
            "CREATE TABLE word (id serial primary key, deck_id integer REFERENCES deck(id), word varchar(50), meaning varchar(100), description varchar(200), time_create int)"
          );
        } catch (error) {
          console.log(error);
        }
      }
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = migrate;
