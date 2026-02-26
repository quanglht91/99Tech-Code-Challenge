import { RequestHandler } from 'express';
import { ResourceModel } from '../models/resource.model';
import { Resource } from '../types/resource';

export class ResourceController {

    /**
     * Create a new resource
     */
    static create: RequestHandler = async (req, res, next) => {
        try {
            const { name, description, category } = req.body;

            if (!name) {
                return res.status(400).json({ error: 'Name is required' });
            }

            const newResource: Resource = { name, description, category };
            const created = await ResourceModel.create(newResource);
            res.status(201).json(created);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get all resources
     */
    static getAll: RequestHandler = async (req, res, next) => {
        try {
            const category = req.query.category as string | undefined;
            const name = req.query.name as string | undefined;
            const resources = await ResourceModel.findAll({ category, name });
            res.status(200).json(resources);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get a specific resource by ID
     */
    static getById: RequestHandler = async (req, res, next) => {
        try {
            const id = parseInt(req.params.id as string, 10);
            if (isNaN(id)) {
                return res.status(400).json({ error: 'Invalid ID format' });
            }

            const resource = await ResourceModel.findById(id);
            if (!resource) {
                return res.status(404).json({ error: 'Resource not found' });
            }

            res.status(200).json(resource);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Update a resource
     */
    static update: RequestHandler = async (req, res, next) => {
        try {
            const id = parseInt(req.params.id as string, 10);
            if (isNaN(id)) {
                return res.status(400).json({ error: 'Invalid ID format' });
            }

            const { name, description, category } = req.body;

            if (name === undefined && description === undefined && category === undefined) {
                return res.status(400).json({ error: 'At least one field (name, description, category) is required for update' });
            }

            const updated = await ResourceModel.update(id, { name, description, category });

            if (!updated) {
                return res.status(404).json({ error: 'Resource not found' });
            }

            res.status(200).json(updated);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Delete a resource
     */
    static delete: RequestHandler = async (req, res, next) => {
        try {
            const id = parseInt(req.params.id as string, 10);
            if (isNaN(id)) {
                return res.status(400).json({ error: 'Invalid ID format' });
            }

            const isDeleted = await ResourceModel.delete(id);
            if (!isDeleted) {
                return res.status(404).json({ error: 'Resource not found' });
            }

            res.status(200).json({ message: 'Resource deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}
