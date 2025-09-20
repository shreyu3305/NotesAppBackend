import { Router } from 'express';
import { NotesController } from './controller.js';
import { authGuard } from '../../middlewares/authGuard.js';
const router = Router();
// All notes routes require authentication
router.use(authGuard);
// Notes CRUD routes
router.get('/', NotesController.list);
router.post('/', NotesController.create);
router.get('/tags', NotesController.getTags);
router.get('/:id', NotesController.getById);
router.patch('/:id', NotesController.update);
router.delete('/:id', NotesController.delete);
export { router as notesRoutes };
//# sourceMappingURL=routes.js.map