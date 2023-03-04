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


