import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@pjassetmanagement.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe!2026";
  const clientEmail = process.env.DEMO_CLIENT_EMAIL ?? "client@pjassetmanagement.com";
  const clientPassword = process.env.DEMO_CLIENT_PASSWORD ?? "ClientDemo!2026";

  // ---- Admin ------------------------------------------------------------
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: "ADMIN" },
    create: {
      email: adminEmail,
      name: "Site Administrator",
      role: "ADMIN",
      passwordHash: await bcrypt.hash(adminPassword, 12),
    },
  });
  console.log(`✔ Admin ready: ${adminEmail}`);

  // ---- Demo client + portfolio -----------------------------------------
  const client = await prisma.user.upsert({
    where: { email: clientEmail },
    update: { role: "CLIENT" },
    create: {
      email: clientEmail,
      name: "Jonathan Reed",
      role: "CLIENT",
      passwordHash: await bcrypt.hash(clientPassword, 12),
    },
  });

  await prisma.portfolioHolding.deleteMany({ where: { userId: client.id } });
  await prisma.portfolioHolding.createMany({
    data: [
      {
        userId: client.id,
        name: "Core Real Estate Fund",
        category: "Real Estate",
        allocation: 38,
        value: 152000,
        changePct: 6.4,
      },
      {
        userId: client.id,
        name: "Private Equity Ventures",
        category: "Private Equity",
        allocation: 27,
        value: 108000,
        changePct: 11.2,
      },
      {
        userId: client.id,
        name: "Global Fixed Income",
        category: "Fixed Income",
        allocation: 20,
        value: 80000,
        changePct: 3.1,
      },
      {
        userId: client.id,
        name: "International Equities",
        category: "Global Equities",
        allocation: 15,
        value: 60000,
        changePct: 8.7,
      },
    ],
  });
  console.log(`✔ Demo client ready: ${clientEmail}`);

  // ---- Announcement -----------------------------------------------------
  const announcementCount = await prisma.announcement.count();
  if (announcementCount === 0) {
    await prisma.announcement.create({
      data: {
        title: "Q2 2026 portfolio review now available",
        body: "Your quarterly performance summary has been published. Reach out to your relationship manager with any questions about the latest allocations.",
      },
    });
    console.log("✔ Sample announcement created");
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
