import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { startOfDay } from "date-fns";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const userId = session.user.id;

    const userLinktrees = await db.linktree.findMany({
      where: { userId },
      include: {
        links: {
          select: {
            id: true,
            isActive: true,
          },
        },
      },
    });

    if (userLinktrees.length === 0) {
      return NextResponse.json({
        totalLinkUps: 0,
        totalLinks: 0,
        activeLinks: 0,
        totalClicks: 0,
        todayClicks: 0,
        mostClickedLink: null,
      });
    }

    const linkIds = userLinktrees.flatMap((tree) =>
      tree.links.map((link) => link.id)
    );

    const today = startOfDay(new Date());

    const [totalClicks, todayClicks, mostClickedLinkData] = await Promise.all([
      db.click.count({
        where: { linkId: { in: linkIds } },
      }),

      db.click.count({
        where: {
          linkId: { in: linkIds },
          createdAt: { gte: today },
        },
      }),

      db.click.groupBy({
        by: ["linkId"],
        _count: {
          linkId: true,
        },
        where: { linkId: { in: linkIds } },
        orderBy: {
          _count: {
            linkId: "desc",
          },
        },
        take: 1,
      }),
    ]);

    let mostClickedLink = null;
    if (mostClickedLinkData.length > 0) {
      const topLinkId = mostClickedLinkData[0].linkId;
      const linkDetails = await db.link.findUnique({
        where: { id: topLinkId },
        select: { title: true, url: true },
      });
      mostClickedLink = {
        ...linkDetails,
        clicks: mostClickedLinkData[0]._count.linkId,
      };
    }

    const allLinks = userLinktrees.flatMap((tree) => tree.links);
    const totalLinks = allLinks.length;
    const activeLinks = allLinks.filter((link) => link.isActive).length;

    const analytics = {
      totalLinkUps: userLinktrees.length,
      totalLinks,
      activeLinks,
      totalClicks,
      todayClicks,
      mostClickedLink,
    };

    return NextResponse.json(analytics);
  } catch (error) {
    console.error("[ANALYTICS_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Falha ao buscar as análises" },
      { status: 500 }
    );
  }
}
