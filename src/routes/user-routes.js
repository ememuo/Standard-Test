import express from 'express';
import { getByUserId } from '../controllers/posts-controllers.js';
import { deleteUser, getAllUser, login, signup, updateUser } from '../controllers/user-controllers.js';

const router = express.Router();

router.get('/', getAllUser)
router.post('/signup', signup)
router.post('/login', login)
router.get('/user/:id',getByUserId)
router.put('/:id', deleteUser)
router.patch('/:id/update', updateUser)

export default UserRouter; 


