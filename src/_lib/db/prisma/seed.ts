import CONFIG from "@_lib/config";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: CONFIG.EMAIL_ADMIN_S_PORT },
    update: {},
    create: {
      email: CONFIG.EMAIL_ADMIN_S_PORT,
      first_name: "admin",
      password: CONFIG.PASSWORD_ADMIN_S_PORT,
      phone_number: "083111962313",
      is_verified: true,
    },
  });

  console.log({ admin });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
