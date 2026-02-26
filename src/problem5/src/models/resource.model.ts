import { runQuery, getAllRows, getRow } from '../database/sqlite';
import { Resource } from '../types/resource';

export class ResourceModel {
    /**
     * Create a new resource in the database
     */
    static async create(resource: Resource): Promise<Resource> {
        const query = 'INSERT INTO resources (name, description, category) VALUES (?, ?, ?)';
        const params = [resource.name, resource.description, resource.category];
        const result = await runQuery(query, params);

        const newResource = await this.findById(result.id);
        if (!newResource) throw new Error("Failed to retrieve created resource.");
        return newResource;
    }

    /**
     * Get all resources, optionally filtered by category and name
     */
    static async findAll(filters: { category?: string, name?: string } = {}): Promise<Resource[]> {
        let query = 'SELECT * FROM resources';
        const params: unknown[] = [];
        const conditions: string[] = [];

        if (filters.category) {
            conditions.push('category = ?');
            params.push(filters.category);
        }

        if (filters.name) {
            conditions.push('name LIKE ?');
            params.push(`%${filters.name}%`);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        return await getAllRows<Resource>(query, params);
    }

    /**
     * Find a resource by its ID
     */
    static async findById(id: number): Promise<Resource | undefined> {
        return await getRow<Resource>('SELECT * FROM resources WHERE id = ?', [id]);
    }

    /**
     * Update an existing resource
     */
    static async update(id: number, data: Partial<Resource>): Promise<Resource | null> {
        const updates: string[] = [];
        const params: unknown[] = [];

        if (data.name !== undefined) {
            updates.push('name = ?');
            params.push(data.name);
        }
        if (data.description !== undefined) {
            updates.push('description = ?');
            params.push(data.description);
        }
        if (data.category !== undefined) {
            updates.push('category = ?');
            params.push(data.category);
        }

        if (updates.length === 0) return null; // Nothing to update

        const query = `UPDATE resources SET ${updates.join(', ')} WHERE id = ?`;
        params.push(id);

        const result = await runQuery(query, params);
        if (result.changes === 0) return null; // Not found

        const updatedResource = await this.findById(id);
        return updatedResource || null;
    }

    /**
     * Delete a resource
     */
    static async delete(id: number): Promise<boolean> {
        const result = await runQuery('DELETE FROM resources WHERE id = ?', [id]);
        return result.changes > 0;
    }
}
