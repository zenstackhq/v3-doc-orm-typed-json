import { createClient } from './db';

async function main() {
  const db = await createClient();

  try {
    await db.user.create({ 
      // @ts-expect-error
      data: { email: 'u1@test.com', profile: { gender: 'male' } }
    });
  } catch (err: any) {
    console.log('Got expected error:', err.message);
  }

  // query results have the `profile` file strongly typed
  const user = await db.user.create({
    data: { email: 'u1@test.com', profile: { gender: 'male', age: 20 } }
  });
  console.log(`User created: age ${user.profile.age}, gender ${user.profile.gender}`);

  // it doesn't prevent you from adding extra fields to the object
  console.log('Update typed-JSON field with extra fields');
  console.log(await db.user.update({
    where: { id: user.id },
    data: { profile: { ...user.profile, tag: 'vip' }}
  }));
}

main();
