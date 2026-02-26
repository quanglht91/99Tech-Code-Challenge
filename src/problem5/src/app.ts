import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import resourceRoutes from './routes/resource.routes';
import { errorHandler } from './middlewares/errorHandler';
import { setupSwagger } from './docs/swagger';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/v1/resources', resourceRoutes);

// Swagger Documentation
setupSwagger(app);

// Error Handling Middleware (must be registered last)
app.use(errorHandler);

export default app;
