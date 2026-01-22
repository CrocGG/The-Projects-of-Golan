const uuidGenerator = () => {

    const pool = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];

    const hyphen = '-'
    
    let uuid = ''

    for (i = 1; i <= 36; i++) {
        if (i !== 9 && i !== 14 && i !== 19 && i !== 24) {
            const randomizedNumber = Math.floor((Math.random() * 16))
            const randomizedCharacter = pool[randomizedNumber]
            uuid += randomizedCharacter
        }
        else {
            uuid += hyphen
        }
        
    }
    return uuid
}

console.log(uuidGenerator())