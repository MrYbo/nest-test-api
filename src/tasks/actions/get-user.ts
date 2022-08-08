import { getManager } from 'typeorm';
import { User } from '../../modules/user/entities/user.entity';

export default {
  name: 'get-user',

  description: 'Get user',

  action: async (options): Promise<User> => {
    return await getManager()
      .createQueryBuilder(User, 'user')
      .where('user.id = :id', { id: options.id })
      .getOne();
  },
};
