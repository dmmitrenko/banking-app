import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  await prisma.role.createMany({
    data: [
        {title: 'Admin'},
        {title: 'User'}
    ]
  })

  await prisma.transactionType.createMany({
    data: [
        {title: 'deposit'},
        {title: 'withdrawal'},
        {title: 'transfer'}
    ]
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })