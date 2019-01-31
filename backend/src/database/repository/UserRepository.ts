import { EntityRepository, Repository } from 'typeorm';
import User from '../entity/User';
import { hash } from '../../lib/common';
import { generate } from '../../lib/token';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public findUser(type: 'email' | 'username', value: string) {
    return this.findOne({
      where: { [type]: value },
    });
  }

  public findByUserId(id: string) {
    return this.findOne({
      where: {
        id,
      },
    });
  }

  public unRegister(id: string) {
    return this.createQueryBuilder()
      .delete()
      .from(User)
      .where('id=:id', { id })
      .execute();
  }

  public localRegister(email: string, password: string, username: string) {
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = hash(password);

    return this.manager.save(user);
  }

  public async generateToken(userId: string): Promise<string> {
    const userData = await this.findByUserId(userId);

    if (!userData) {
      throw new Error('user not found');
    }

    const { id, username, email, thumbnail } = userData;
    const user = {
      id,
      username,
      email,
      thumbnail,
    };

    return generate({ user });
  }
}

export default UserRepository;
