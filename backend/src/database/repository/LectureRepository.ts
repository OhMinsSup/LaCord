import { EntityRepository, Repository } from 'typeorm';
import Lecture from '../entity/Lecture';

@EntityRepository(Lecture)
class LectureRepository extends Repository<Lecture> {}

export default LectureRepository;
