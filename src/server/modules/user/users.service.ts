import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { User } from './user.entity';

// TypeORM transaction pattern
// https://docs.nestjs.com/techniques/database#transactions
// can use other patterns as well
@Injectable()
export class UsersService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager
  ) {}

  findAll() {
    return this.entityManager.find(User);
  }

  findOne(id: string) {
    return this.entityManager.findOne(User, id);
  }

  async remove(id: string) {
    await this.entityManager.delete(User, id);
  }

  create(userName: Pick<User, 'firstName' | 'lastName'>) {
    const user = new User();
    user.firstName = userName.firstName;
    user.lastName = userName.lastName;
    return this.entityManager.save(user);
  }

  async createMany(users: User[]) {
    for (let i = 0; i < users.length; i += 1) {
      await this.entityManager.save(users[i]);
    }
  }
}
