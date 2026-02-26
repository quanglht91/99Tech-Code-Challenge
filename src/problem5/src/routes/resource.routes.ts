import { Router } from 'express';
import { ResourceController } from '../controllers/resource.controller';
import { validate } from '../middlewares/validate';
import {
    createResourceSchema,
    updateResourceSchema,
    getResourceByIdSchema,
} from '../validators/resource.validator';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Resource:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - category
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the resource
 *         name:
 *           type: string
 *           description: The name of the resource
 *         description:
 *           type: string
 *           description: The description of the resource
 *         category:
 *           type: string
 *           description: The assigned category of the resource
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the resource was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the resource was last updated
 *     ValidationError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *               message:
 *                 type: string
 */

/**
 * @swagger
 * tags:
 *   name: Resources
 *   description: The resources managing API
 */

/**
 * @swagger
 * /api/v1/resources:
 *   post:
 *     summary: Create a new resource
 *     tags: [Resources]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resource'
 *     responses:
 *       201:
 *         description: The resource was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       500:
 *         description: Server error
 */
router.post('/', validate(createResourceSchema), ResourceController.create);

/**
 * @swagger
 * /api/v1/resources:
 *   get:
 *     summary: Returns the list of all the resources
 *     tags: [Resources]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by resource name
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by resource category
 *     responses:
 *       200:
 *         description: The list of the resources
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Resource'
 */
router.get('/', ResourceController.getAll);

/**
 * @swagger
 * /api/v1/resources/{id}:
 *   get:
 *     summary: Get the resource by id
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The resource id
 *     responses:
 *       200:
 *         description: The resource description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       404:
 *         description: The resource was not found
 */
router.get('/:id', validate(getResourceByIdSchema), ResourceController.getById);

/**
 * @swagger
 * /api/v1/resources/{id}:
 *   put:
 *     summary: Update the resource by the id
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The resource id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resource'
 *     responses:
 *       200:
 *         description: The resource was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       400:
 *         description: Validation error
 *       404:
 *         description: The resource was not found
 *       500:
 *         description: Server error
 */
router.put('/:id', validate(updateResourceSchema), ResourceController.update);

/**
 * @swagger
 * /api/v1/resources/{id}:
 *   delete:
 *     summary: Remove the resource by id
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The resource id
 *     responses:
 *       204:
 *         description: The resource was deleted
 *       404:
 *         description: The resource was not found
 */
router.delete('/:id', validate(getResourceByIdSchema), ResourceController.delete);

export default router;
