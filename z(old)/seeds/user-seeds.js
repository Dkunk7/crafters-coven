const { User } =  require(`../models`);

const userData = [
    {
        username: `Drogar`,
        email: 'drogar@email.com',
        password: `pswd123`,
        is_admin: true
    },
    {
        username: `Kalibu`,
        email: 'kalibu@email.com',
        password: `pswd123`
    },
    {
        username: `Trouser`,
        email: 'trouser@email.com',
        password: `pswd123`
    },
    {
        username: `Crogus`,
        email: 'crogus@email.com',
        password: `pswd123`
    },
    {
        username: `Bowee`,
        email: 'bowee@email.com',
        password: `pswd123`
    },
]

const seedUsers = () => User.bulkCreate(userData, {individualHooks: true});
module.exports = seedUsers;