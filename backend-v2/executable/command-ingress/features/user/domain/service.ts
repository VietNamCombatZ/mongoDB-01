import { UserEntity, UserService } from '../types';
import UserModel from '../../../../../internal/model/user';
import path from 'path';

export class UserServiceImpl implements UserService {
  async getOne(id: string): Promise<UserEntity> {
    const user = await UserModel.findById(id);
    if(!user){
      throw new Error('User not found');
    }

    return {
      id: String(user._id),
      name: String(user.name),
      avatar: String(user.avatar),
      email: String(user.email),
    };
  }
  async getAllFollowers(id: string): Promise<UserEntity[]> {
    const userId = id;
    const user = await UserModel.findById(userId).populate({path: 'followers', select: 'name avatar email'});
    if(!user){
      throw new Error('User not found');
    }
    if(!user.followers){
      return [];
    }

    //need better approach than using any
    return user.followers.map((follower : any ) => ({
      id: String(follower._id),
      name: String(follower.name),
      avatar: String(follower.avatar),
      email: String(follower.email),
    }));
    
    
  }
  async getAllFollowings(id: string): Promise<UserEntity[]> {
    const userId = id;
    const user = await UserModel.findById(userId).populate({path: 'followings', select: 'name avatar email'});
    if(!user){
      throw new Error('User not found');
    }
    if(!user.followings){
      return [];
    }
    //need better approach than using any
    return user.followings.map((following :any ) => ({
      id: String(following._id),
      name: String(following.name),
      avatar: String(following.avatar),
      email: String(following.email),
    }));
    
    
  }
  async followUser(sub:string,id: string): Promise<boolean> {
      const user = await UserModel.findById(sub);
      if(!user){
        throw new Error('User not found');
      }
      const userToFollow = await UserModel.findById(id);
      if(!userToFollow){
        throw new Error('User to follow not found');
      }
      if(user.followings.includes(userToFollow._id)){
        throw new Error('User already followed');
      }
      if(user._id.equals(userToFollow._id)){
        throw new Error('Cannot follow self');
      }
      user.followings.push(userToFollow._id);
      userToFollow.followers.push(user._id);
      try {
        await Promise.all([user.save(), userToFollow.save()]);
        return true;
    } catch (error) {
        throw new Error('Failed to follow user');
    }
  }
  async unfollowUser(sub: string, id: string): Promise<boolean> {
    const user = await UserModel.findById(sub);
    if(!user){
      throw new Error('User not found');
    }
    const userToUnFollow = await UserModel.findById(id);
    if(!userToUnFollow){
      throw new Error('User to un follow not found');
    }
    if(!user.followings.includes(userToUnFollow._id)){
      throw new Error('User already unfollowed');
    }
    if(user._id.equals(userToUnFollow._id)){
      throw new Error('Cannot unfollow self');
    }
    const [unfollowResult, updateFollowerResult] = await Promise.all([
      user.updateOne({ $pull: { followings: userToUnFollow._id } }),
      userToUnFollow.updateOne({ $pull: { followers: user._id } }),
  ]);

  if (!unfollowResult.modifiedCount || !updateFollowerResult.modifiedCount) {
      throw new Error('Failed to unfollow user');
  }
    return true;
  }

}