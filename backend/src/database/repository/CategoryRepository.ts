import { EntityRepository, Repository } from 'typeorm';
import Category from '../entity/Category';

@EntityRepository(Category)
class CategoryRepository extends Repository<Category> {}

export default CategoryRepository;
