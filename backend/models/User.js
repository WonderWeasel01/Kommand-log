import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const users = []; // This should ideally be replaced with a database

const addUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { username, password: hashedPassword };
  users.push(user);
  return user;
};

const findUserByUsername = (username) => {
  return users.find(user => user.username === username);
};

// Function to create an admin user and generate a JWT token
const createAdminUser = async () => {
  const username = 'admin123';
  const password = 'adminpassword';

  // Check if the admin user already exists
  let adminUser = findUserByUsername(username);
  if (!adminUser) {
    // Add admin user
    adminUser = await addUser(username, password);

    // Generate JWT token
    const token = jwt.sign({ username: adminUser.username }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    console.log('Admin user created:', { username, token });
  }
};

export {
  addUser,
  findUserByUsername,
  createAdminUser,
};
