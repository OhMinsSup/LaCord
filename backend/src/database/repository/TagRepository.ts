import { EntityRepository, Repository } from 'typeorm';
import Tag from '../entity/Tag';
import Post from '../entity/Post';

@EntityRepository(Tag)
class TagRepository extends Repository<Tag> {
    public async getById(name: string) {        
        try {
            let tag = await this.findOne({
                where :{
                    name
                }
            });

            if (!tag) {
                tag = new Tag();
                tag.name = name;
                await this.manager.save(tag);
            }

            return tag;
        } catch (e) {
            throw e;
        }
    }
}

export default TagRepository;