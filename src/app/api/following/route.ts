import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getUserDataSelect } from "@/lib/types";

export const GET = async (req: Request) => {
  const { user } = await validateRequest();

  if (!user) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const following = await prisma.user.findMany({
    where: {
      followers: {
        some: { followerId: user.id },
      },
    },
    select: getUserDataSelect(user.id),
  });

  return new Response(JSON.stringify(following), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
