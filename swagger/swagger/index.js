import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import swaggerAutogen from 'swagger-autogen'

const _dirname = dirname(fileURLToPath(import.meta.url))

const doc = {
    info: {
        title: 'Phonebook API',
        description: 'API для работы с телефонным справочником',
    },
    definitions: {
        PhoneEntry: {
            id: 1,
            name: 'Егорик',
            number: '8029-651-91-64'
        },
        PhoneEntries: [
            {
                $ref: '#/definitions/PhoneEntry'
            }
        ],
        NewPhoneEntry: {
            name: 'Захарчик',
            number: '8033-363-28-88'
        },
        UpdatedPhoneEntry: {
            name: 'Максим',
            number: '8033-630-84-21'
        }
    },
    host: 'localhost:3000',
    schemes: ['http']
};

const outputFile = join(_dirname, 'output.json')
const endpointsFiles = [join(_dirname, '../server.js')]

swaggerAutogen(/*options*/)(outputFile, endpointsFiles, doc).then(({ success }) => {
 console.log(`Generated: ${success}`)
})