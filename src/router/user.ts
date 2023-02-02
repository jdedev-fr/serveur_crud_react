import express from 'express';
import { CUser } from '~/controler/user';
import { checkToken } from '~/middleware/checkToken';

export const userRouter = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              email
 *              password
 *          properties:
 *              id:
 *                  type: number
 *                  description: The auto generated id of the user
 *              email:
 *                  type: string
 *                  description: The email of the user
 *              password:
 *                  type: string
 *                  description: The password of the user
 *              level:
 *                  type: number
 *                  description: Not used in this version of the API
 *          example:
 *              id: 1
 *              email: admin@test.com
 *              password: test
 *      Token:
 *          type: object
 *          required: token
 *          properties:
 *              token:
 *                  type: string
 *                  description: Token d'authentification de l'utilisateur
 *  securitySchemes:
 *      api_key:
 *          type: apiKey
 *          name: Authorization
 *          in: header
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: The users managing API
 */

/**
 * @swagger
 * /users:
 *  get:
 *      summary: Returns the list of all the users
 *      tags: [Users]
 *      responses:
 *          200:
 *              descriptions: The list of the users
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 *      security:
 *          - api_key: []
 */

userRouter.get('/', checkToken as any, CUser.getAll)

/**
 * @swagger
 * /users/{id}:
 *  get:
 *      summary: Get the user by id
 *      tags: [Users]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: string
 *            required: true
 *            description: The user id
 *      responses:
 *          200:
 *              description: The user description by id
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          410:
 *              description: The user was not found
 *          401:
 *              description: Authorization needed
 *      security:
 *          - api_key: []
 */
userRouter.get('/:id', checkToken as any, CUser.getById as any)

/**
 * @swagger
 * /users:
 *  post:
 *      summary: Add a new user
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: The user created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          401:
 *              description: Authorization needed
 */
userRouter.post('/', CUser.add as any)

/**
 * @swagger
 * /users/login:
 *  post:
 *      summary: Log a user
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: The auth token of the user
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Token'
 *          401:
 *              description: The user was not found
 */
userRouter.post('/login', CUser.login as any)

/**
 * @swagger
 * /users/{id}:
 *  put:
 *      summary: Modify a user by id
 *      tags: [Users]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: string
 *            required: true
 *            description: The user id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: The user modified
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          410:
 *              description: The user was not found
 *          401:
 *              description: Authorization needed
 *      security:
 *          - api_key: []
 */
userRouter.put('/:id', checkToken as any, CUser.update as any)
/**
 * @swagger
 * /users/{id}:
 *  delete:
 *      summary: Delete the user by id
 *      tags: [Users]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: string
 *            required: true
 *            description: The user id
 *      responses:
 *          200:
 *              description: The user description by id
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          410:
 *              description: The user was not found
 *          401:
 *              description: Authorization needed
 *      security:
 *          - api_key: []
 */
userRouter.delete('/:id', checkToken as any, CUser.delete as any)

