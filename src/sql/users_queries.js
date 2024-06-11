const signup =
  '  INSERT INTO "user" (user_name, email, "password","type" ) VALUES ($1, $2, $3, $4) RETURNING *';
const login = 'SELECT * FROM "user" WHERE email = $1';
module.exports = { signup, login };
