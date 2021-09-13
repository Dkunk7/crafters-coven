const seedUsers = require(`./user-seeds`);
const seedNotes = require(`./note-seeds`);
const seedComments = require(`./comment-seeds`);

const sequelize = require(`../config/connection`);

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log(`------STARTING SEEDS------`);

    console.log(`------SEEDING USERS------`);
    await seedUsers();

    console.log(`------SEEDING NOTES------`);
    await seedNotes();

    console.log(`------SEEDING COMMENTS------`);
    await seedComments();

    process.exit(0);
};

seedAll();