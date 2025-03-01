type UserEntity = {
  id: string;
  email: string;
  name: string;
  avatar: string;
}



interface UserService {
  getOne(id: string): Promise<UserEntity>;
  getAllFollowers(id: string): Promise<UserEntity[]>;
  getAllFollowings(id: string): Promise<UserEntity[]>;
  followUser(sub: string,id: string): Promise<boolean>;
  unfollowUser(sub: string,id: string): Promise<boolean>;
}

export {
  UserEntity,
  UserService,
};
