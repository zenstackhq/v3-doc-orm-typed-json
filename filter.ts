import { inspect } from 'node:util';
import { createClient } from './db';

async function main() {
  const db = await createClient();

  const user = await db.user.create({
    data: {
      email: 'u1@test.com',
      // "profile" is a typed JSON field
      profile: {
        age: 20,
        jobs: [
          { company: 'ZenStack', title: 'Developer' },
          { company: 'GitHub', title: 'DevRel' }
        ]
      }
    }
  });
  console.log(`User created: ${inspect(user, false, null)}\n`);

  // filter with typed fields
  console.log('Query users with profile.age > 18');
  const adults = await db.user.findMany({
    where: { profile: { age: { gt: 18 } } }
  });
  console.log(inspect(adults, false, null), '\n');

  // filter with typed array fields
  console.log('Query users who have had Dev related jobs');
  const zenstackDevs = await db.user.findMany({
    where: { profile: { jobs: { some: { title: { contains: 'Dev' } } } } }
  });
  console.log(inspect(zenstackDevs, false, null));
}

main();
