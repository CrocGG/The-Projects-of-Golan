const allCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const allCharactersWithSpecials = allCharacters + `~!@#$%^&*()_+=-[]{}/:;?"|'<>.,`;

const allCharactersWithEmojis = allCharactersWithSpecials + '😁😍😴😭😅🥶🤡🦧🦔🐳🐬🦨🐢🐈';

const generatePassword = (construction, lengthOfPassword) => {
    const charArray = [...construction];

    let newPassword = '';
    for (let i = 1; i <= lengthOfPassword; i++) {
        const randomalNumber = Math.floor(Math.random() * charArray.length);
        newPassword += charArray[randomalNumber];
    }
    return newPassword;
};

const length = process.argv[2] ? +process.argv[2] : 14;

console.log('AlphaNumeric:', generatePassword(allCharacters, length));
console.log('With Specials:', generatePassword(allCharactersWithSpecials, length));
console.log('With Emojis:', generatePassword(allCharactersWithEmojis, length));

module.exports = generatePassword;