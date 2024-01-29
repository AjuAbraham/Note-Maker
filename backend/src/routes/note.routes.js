import Router from 'express'
import { createNote, deleteNote, displayNote, displaySpecificNote, updateNote } from '../controller/note.controller.js';
import  verifyLoggedIn  from '../middlewares/auth.middleware.js'
const router= Router();

router.use(verifyLoggedIn)
router.route('/create-note').post(createNote)
router.route('/update-note/:noteId').patch(updateNote)
router.route('/delete-note/:noteId').delete(deleteNote)
router.route('/display-note').get(displayNote)
router.route('/displayA-note/:noteId').get(displaySpecificNote);








export default router;