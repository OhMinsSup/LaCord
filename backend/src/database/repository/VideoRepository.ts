import { EntityRepository, Repository } from 'typeorm';
import Video from '../entity/Video';

@EntityRepository(Video)
class VideoRepository extends Repository<Video> {}

export default VideoRepository;
