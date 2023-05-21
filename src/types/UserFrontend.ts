interface UserFrontend {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  img: Buffer;
  isTrainer: boolean;
}

export default UserFrontend;
