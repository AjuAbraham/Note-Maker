import Router from 'express'
import { createNote, deleteNote, displayNote, updateNoteContent, updateNoteTitle } from '../controller/note.controller.js';
import  verifyLoggedIn  from '../middlewares/auth.middleware.js'
const router= Router();

router.use(verifyLoggedIn)
router.route('/create-note').post(createNote)
router.route('/update-title/:noteId').patch(updateNoteTitle)
router.route('/update-content/:noteId').patch(updateNoteContent)
router.route('/delete-note/:noteId').delete(deleteNote)
router.route('/display-note').get(displayNote)








export default router;