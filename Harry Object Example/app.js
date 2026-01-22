"use strict";

(() => {
    const harry = {
        'author': 'JK Rowling',
        'characters': {
            'hero': 'Harry',
            'villain': 'Lord Voldemort'
        },
        'series': 7
    }

    harry['author'] = 'hermione'
    harry.series += 1
    harry['characters']['best friend'] = 'hermione'
    console.log(harry)
})();


