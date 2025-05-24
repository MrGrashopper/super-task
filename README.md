# 1. Dependencies 
yarn install

# 2. DB & Prisma Client 
npx prisma migrate dev --skip-seed

# 3. Start
yarn dev

# 4. See DB (optioanl)
npx prisma studio
