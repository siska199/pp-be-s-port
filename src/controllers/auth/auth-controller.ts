import catchErrors from "@helpers/catch-error";
import { validateMandatoryFields } from "@helpers/validation";
import { CustomError } from "@middleware/error-handler";

export const register = catchErrors(async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  if ([first_name, last_name, email, password]?.some((data) => !data)) {
    const message = validateMandatoryFields({
      first_name,
      last_name,
      email,
      password,
    });
    throw new  CustomError(message, 400);
  }



});
