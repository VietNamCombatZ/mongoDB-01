import express from 'express';
import { UserController } from './controller';
import requireAuthorizedUser from '../../../middlewares/auth';

const setupUserRoute = (controller: UserController) => {
    const router = express.Router();

    router.get('/:id', requireAuthorizedUser, controller.getOne.bind(controller));

    router.get('/:id/followers',requireAuthorizedUser, controller.getFollowers.bind(controller))
    .get('/:id/followings',requireAuthorizedUser, controller.getFollowings.bind(controller));

    // router.post('/:id/follow',requireAuthorizedUser, controller.follow.bind(controller));

    

    return router;
}

export default setupUserRoute;
