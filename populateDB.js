const User = require('../models/user');
const bcrypt = require('bcrypt');

const names = ['John', 'Mary', 'William', 'Elizabeth', 'James', 'Sarah', 'Charles', 'Margaret', 'George', 'Ann'];
const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com'];
const skills = ['Python', 'Java', 'JavaScript', 'C#', 'PHP', 'Ruby', 'Swift', 'Kotlin', 'Objective-C', 'SQL', 'Azure', 'AWS', 'C++', 'Machine Learning', 'Artificial Intelligence', 'Data Science', 'Data Analytics', 'Data Visualization', 'Data Mining', 'Data Engineering', 'Data Architecture', 'Data Modeling'];
const careers = ['Software Engineer', 'Data Scientist', 'Data Analyst', 'Data Engineer', 'Data Architect', 'Machine Learning Engineer', 'Artificial Intelligence Engineer', 'Data Visualization Engineer', 'Data Mining Engineer', 'Data Science Engineer', 'Data Analytics Engineer'];

async function createUsers() {
const password = await bcrypt.hash('password123', 10);

    for (let i = 0; i < 1; i++) {
        const name = names[Math.floor(Math.random() * names.length)];
        const email = `${name.toLowerCase()}${i}@${domains[Math.floor(Math.random() * domains.length)]}`;
        const skill1 = skills[Math.floor(Math.random() * skills.length)];
        const skill2 = skills[Math.floor(Math.random() * skills.length)];
        const skill3 = skills[Math.floor(Math.random() * skills.length)];
        const career = careers[Math.floor(Math.random() * careers.length)];

        const user = new User({
            name: name,
            email: email,
            role: 'user',
            password: password,
            career: career,
            skills: `${skill1}, ${skill2}, ${skill3}`,
        });

        try {
            console.log(user);
            await user.save({ w: 1, wtimeout: 30000});
            console.log(`User ${i + 1} created: ${name}, ${email}`);
        } catch (error) {
            console.error(`Error creating user ${i + 1}: ${error.message}`);
        }
    }
}
createUsers();
