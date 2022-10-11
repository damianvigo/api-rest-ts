import { Auth } from '../interfaces/auth.interface';
import { User } from '../interfaces/user.interface';
import UserModel from '../models/users';
import { encrypt, verified } from '../utils/bcrypt.handle';
import { generateToken } from '../utils/jwt.handle';

const registerNewUser = async (authUser: User) => {
  const checkIs = await UserModel.findOne({ email: authUser.email }); // * Searching email if is already exist
  if (checkIs) return 'ALREADY_USER'; // ! Exist

  const passHash = await encrypt(authUser.password); // TODO 12345678

  const registerNewUser = await UserModel.create({
    email: authUser.email,
    password: passHash,
    name: authUser.name,
  }); // * new User

  return registerNewUser;
};

const loginUser = async ({ email, password }: Auth) => {
  const checkIs = await UserModel.findOne({ email }); // * Searching email if is already exist
  if (!checkIs) return 'NOT_FOUND_USER'; // ! None Exist

  const passwordHash = checkIs.password; // * encrypt of database
  const isCorrect = await verified(password, passwordHash);

  if (!isCorrect) return 'PASSWORD_INCORRECT';

  const token = generateToken(checkIs.email);

  const data = {
    token,
    user: checkIs,
  };

  return data;
  // return token;
  // return checkIs;
};

export { registerNewUser, loginUser };
