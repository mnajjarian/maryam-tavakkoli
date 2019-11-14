import { ContentBlock } from 'draft-js';
import Media from './Media';

export const mediaBlockRenderer = (block: ContentBlock) => {
    if(block.getType() === 'atomic') {
        return {
            component: Media,
            editable: false
        }
    }
    return null;
}