import bcrypt from 'bcryptjs';

const users=[
    {
        name:'Admin User',
        email:'admin@email.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true,
    },

    {
        name:'Jhon Cena',
        email:'jhon@email.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:false,
    },

    {
        name:'Lisa Kudrow',
        email:'lisa@email.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:false,
    }
];

export default users;
