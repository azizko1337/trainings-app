interface UserBackend {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  img: Buffer;
  isTrainer: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default UserBackend;
