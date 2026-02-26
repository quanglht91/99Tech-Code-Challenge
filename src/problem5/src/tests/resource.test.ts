import request from 'supertest';
import app from '../app';
import { db, runQuery } from '../database/sqlite';

beforeAll(async () => {
    // Clear out the database before running tests
    await runQuery('DELETE FROM resources');
});

afterAll((done) => {
    db.close(done);
});

describe('Resource API Endpoints', () => {
    let createdResourceId: number;

    it('should create a new resource', async () => {
        const res = await request(app)
            .post('/api/v1/resources')
            .send({
                name: 'Test Resource',
                description: 'A resource created for testing.',
                category: 'test-category'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toEqual('Test Resource');
        expect(res.body.category).toEqual('test-category');

        createdResourceId = res.body.id;
    });

    it('should fail to create a resource without a valid category', async () => {
        const res = await request(app)
            .post('/api/v1/resources')
            .send({
                name: 'Test',
                description: 'A resource without category',
                category: 'a' // Too short (< 2 characters)
            });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message');
        expect(res.body.errors[0].field).toEqual('body.category');
    });

    it('should fetch all resources', async () => {
        const res = await request(app).get('/api/v1/resources');

        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeGreaterThanOrEqual(1);
    });

    it('should fetch a single resource by ID', async () => {
        const res = await request(app).get(`/api/v1/resources/${createdResourceId}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', createdResourceId);
        expect(res.body.name).toEqual('Test Resource');
    });

    it('should update the resource category', async () => {
        const res = await request(app)
            .put(`/api/v1/resources/${createdResourceId}`)
            .send({
                category: 'new-category'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.category).toEqual('new-category');
        expect(res.body.name).toEqual('Test Resource'); // Unchanged fields remain
    });

    it('should return 400 for updating with invalid category length', async () => {
        const res = await request(app)
            .put(`/api/v1/resources/${createdResourceId}`)
            .send({ category: 'b' }); // Too short (< 2 characters)

        expect(res.statusCode).toEqual(400);
    });

    it('should return 404 for updating non-existent resource', async () => {
        // Must send a valid update according to updateResourceSchema
        const res = await request(app)
            .put('/api/v1/resources/999999')
            .send({ description: 'A detailed description text here.' });

        expect(res.statusCode).toEqual(404);
    });

    it('should return 400 for updating with invalid ID format', async () => {
        const res = await request(app)
            .put('/api/v1/resources/invalid-id')
            .send({ description: 'A detailed description text here.' });

        expect(res.statusCode).toEqual(400);
        expect(res.body.errors[0].field).toEqual('params.id');
    });

    it('should delete the resource', async () => {
        const res = await request(app).delete(`/api/v1/resources/${createdResourceId}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Resource deleted successfully');
    });

    it('should return 404 when fetching deleted resource', async () => {
        const res = await request(app).get(`/api/v1/resources/${createdResourceId}`);
        expect(res.statusCode).toEqual(404);
    });

    it('should return 400 for fetching with invalid ID format', async () => {
        const res = await request(app).get(`/api/v1/resources/invalid-id`);
        expect(res.statusCode).toEqual(400);
        expect(res.body.errors[0].field).toEqual('params.id');
    });
});
