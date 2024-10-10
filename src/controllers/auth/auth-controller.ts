import prisma from "@db/prisma";
import catchErrors from "@helpers/catch-error";
import { encryptBycrypt } from "@helpers/encryption";
import { generateTimeExpired, generateToken } from "@helpers/function";
import { successMessage } from "@helpers/message";
import { CustomError } from "@middleware/error-handler";

export const register = catchErrors(async (req, res) => {
  const { first_name, last_name, email, password, profession } = req.body;

  const userExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExist) throw new CustomError("This email already has been used", 400);

  const hashPassword = encryptBycrypt(password);
  const verifiedToken = generateToken();
  const expiredVerifiedToken = generateTimeExpired();

  const userCreate = await prisma.user.create({
    ...req.body,
    password: hashPassword,
    verified_token: verifiedToken,
    expired_verified_token: expiredVerifiedToken,
  });

  successMessage({
    res,
    code: 200,
    message: "Successfully Created User",
    data: {
      ...userCreate._doc,
    },
  });
});
