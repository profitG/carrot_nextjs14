import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// const test = async () => {
//   const token = await db.sMSToken.create({
//     data: {
//       token: "1212331",
//       user: {
//         connect: {
//           id: 2,
//         },
//       },
//     },
//   });
//   console.log(token);
// };

// test();

export default db;
