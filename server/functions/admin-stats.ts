import { prisma } from "@/db/prisma";

export async function getAdminDashboardStats() {
  try {
    const [
      totalQuestions,
      easyQuestions,
      mediumQuestions,
      hardQuestions,
      totalUsers,
      totalLikes,
      totalBookmarks,
      recentQuestions,
      recentUsers,
    ] = await Promise.all([
      prisma.question.count(),
      prisma.question.count({ where: { difficulty: "Easy" } }),
      prisma.question.count({ where: { difficulty: "Medium" } }),
      prisma.question.count({ where: { difficulty: "Hard" } }),
      prisma.user.count(),
      prisma.questionLike.count(),
      prisma.questionBookmark.count(),
      prisma.question.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          slug: true,
          difficulty: true,
          createdAt: true,
          tags: true,
        },
      }),
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          createdAt: true,
          role: true,
        },
      }),
    ]);

    return {
      totalQuestions,
      easyQuestions,
      mediumQuestions,
      hardQuestions,
      totalUsers,
      totalLikes,
      totalBookmarks,
      recentQuestions,
      recentUsers,
    };
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return {
      totalQuestions: 0,
      easyQuestions: 0,
      mediumQuestions: 0,
      hardQuestions: 0,
      totalUsers: 0,
      totalLikes: 0,
      totalBookmarks: 0,
      recentQuestions: [],
      recentUsers: [],
    };
  }
}

export async function getAllUsersWithActivity() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        questionLikes: {
          include: {
            question: {
              select: {
                id: true,
                title: true,
                slug: true,
                difficulty: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
        questionBookmarks: {
          include: {
            question: {
              select: {
                id: true,
                title: true,
                slug: true,
                difficulty: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    return users;
  } catch (error) {
    console.error("Error fetching users with activity:", error);
    return [];
  }
}
