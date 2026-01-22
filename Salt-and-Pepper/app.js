import { createHmac } from 'crypto'

const saltAndPepperPassword = (secret, plainTextPassword) => {
    return createHmac('sha256', secret).update(plainTextPassword).digest('hex')
}

console.log(saltAndPepperPassword('Blizzard', 'AvArr!Kad@bbrA'))
