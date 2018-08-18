import { EntityRepository, Repository } from 'typeorm';
import User from '../entity/User';
import { hash } from '../../lib/common';
import { generate } from '../../lib/token';

@EntityRepository(User)
class UserRepository extends Repository<User> {
    findUser(type: 'email' | 'username', value: string) {
        return this.findOne({
            where: { [type]: value }
        });
    }

    findByUserId(id: string) {
        return this.findOne({
            where: {
                id
            }
        });
    }

    localRegister(email: string, password: string, username: string) {
        const user = new User();
        user.username = username;
        user.email = email;
        user.password = hash(password);

        return this.manager.save(user);
    }

    async generateToken(userId: string): Promise<string> {    
        const userData = await this.findByUserId(userId);

        if (!userData) {
            throw new Error('user not found');
        }

        const { id, username, email } = userData;
        const user = {
            id,
            username,
            email
        };

        return generate({ user });
    }
};

export default UserRepository;