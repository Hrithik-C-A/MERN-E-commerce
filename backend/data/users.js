import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'John Doe',
        email: 'john@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    },
    {
        name: 'John Cena',
        email: 'cena@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    },
];

export default users;