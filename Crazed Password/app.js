// Instructions: To activate enter this command in the bash terminal in the src directory: 
// node app.ts *The length of password* 
// This way you will get both the moderate and strong command
const allCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const allCharactersWithSpecials = allCharacters + `~!@#$%^&*()_+=-[]{}/:;?"|'<>.,`;
const generatePassword = (construction, lengthOfPassword) => {
    let newPassword = '';
    for (let i = 1; i <= lengthOfPassword; i++) {
        const randomalNumber = Math.floor(Math.random() * construction.length);
        newPassword += construction[randomalNumber];
    }
    return newPassword;
};
console.log(generatePassword(allCharacters, +process.argv[2]));
console.log(generatePassword(allCharactersWithSpecials, +process.argv[2]));
module.exports = generatePassword;
