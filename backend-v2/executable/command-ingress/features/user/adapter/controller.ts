import { BaseController } from '../../../shared/base-controller';
import { HttpRequest } from '../../../types';
import { UserService } from '../types';
import { Response, NextFunction } from 'express';

export class UserController extends BaseController {
  service: UserService;

  constructor(service: UserService) {
    super();
    this.service = service;
  }

  async getOne(req: HttpRequest, res: Response, next: NextFunction): Promise<void> {
    await this.execWithTryCatchBlock(req, res, next, async (req, res, _next) => {
      const { id } = req.params;
      const user = await this.service.getOne(id);
      res.status(200).json(user);
      return;
    });
  }
  async getFollowers(req: HttpRequest, res: Response, next: NextFunction): Promise<void> {
    await this.execWithTryCatchBlock(req, res, next, async (req, res, _next) => {
      const { id } = req.params;
      const followers = await this.service.getAllFollowers(id);
      res.status(200).json(followers);
      return;
    });
  }
  async getFollowings(req: HttpRequest, res: Response, next: NextFunction): Promise<void> {
    await this.execWithTryCatchBlock(req, res, next, async (req, res, _next) => {
      const { id } = req.params;
      const followings = await this.service.getAllFollowings(id);
      res.status(200).json(followings);
      return;
    });
  }
  async followUser(req: HttpRequest, res: Response, next: NextFunction): Promise<void> {
    await this.execWithTryCatchBlock(req, res, next, async (req, res, _next) => {
      const { id } = req.params;
      const sub = req.getSubject();
      const result = await this.service.followUser(sub, id);
      res.status(200).json({ message: 'User followed successfully' });
      return;
    });
  }
  async unfollowUser(req: HttpRequest, res: Response, next: NextFunction): Promise<void> {
    await this.execWithTryCatchBlock(req, res, next, async (req, res, _next) => {
      const { id } = req.params;
      const sub = req.getSubject();
      const result = await this.service.unfollowUser(sub, id);
      res.status(200).json({ message: 'User unfollowed successfully' });
      return;
  });}
}