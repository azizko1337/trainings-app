type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  profileImage: string;
  isTrainer: boolean;
  createdAt: Date;
  updatedAt: Date;
  newPassword?: string;
  oldPassword?: string;
};

export default User;
