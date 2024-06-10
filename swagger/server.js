const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const app = express();
app.use(bodyParser.json());

/**
 * @swagger
 * /TS:
 *   get:
 *     summary: Получить полный список из справочника телефонов
 *     description: Возвращает массив всех записей из справочника телефонов.
 *     responses:
 *       200:
 *         description: Массив всех записей из справочника телефонов
 *         schema:
 *           $ref: '#/definitions/PhoneEntries'
 */
app.get('/TS', async (req, res) => {
    const phoneDirectory = await prisma.phoneEntry.findMany();
    res.json(phoneDirectory);
});

/**
 * @swagger
 * /TS:
 *   post:
 *     summary: Добавить новый телефон в справочник
 *     description: Добавляет новую запись в справочник телефонов.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/NewPhoneEntry'
 *     responses:
 *       201:
 *         description: Новая запись успешно добавлена в справочник
 *         schema:
 *           $ref: '#/definitions/PhoneEntry'
 */
app.post('/TS', async (req, res) => {
    const { name, number } = req.body;
    const newEntry = await prisma.phoneEntry.create({
        data: {
            name,
            number,
        },
    });
    res.status(201).json(newEntry);
});

/**
 * @swagger
 * /TS/{id}:
 *   put:
 *     summary: Скорректировать строку справочника
 *     description: Обновляет существующую запись в справочнике телефонов.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Идентификатор записи в справочнике
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/UpdatedPhoneEntry'
 *     responses:
 *       200:
 *         description: Запись в справочнике успешно обновлена
 *         schema:
 *           $ref: '#/definitions/PhoneEntry'
 */
app.put('/TS/:id', async (req, res) => {
    const { id } = req.params;
    const { name, number } = req.body;
    const updatedEntry = await prisma.phoneEntry.update({
        where: { id: parseInt(id) },
        data: {
            name,
            number,
        },
    });
    res.json(updatedEntry);
});

/**
 * @swagger
 * /TS/{id}:
 *   delete:
 *     summary: Удалить строку справочника
 *     description: Удаляет запись из справочника телефонов по ее идентификатору.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Идентификатор записи в справочнике
 *     responses:
 *       200:
 *         description: Запись успешно удалена из справочника
 */
app.delete('/TS/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.phoneEntry.delete({
        where: { id: parseInt(id) },
    });
    res.send('Phone directory entry deleted.');
});

const swaggerFile = JSON.parse(fs.readFileSync('./swagger/output.json'))
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
