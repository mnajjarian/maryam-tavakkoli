import React from 'react';
import { EntityInstance, ContentBlock, ContentState } from 'draft-js';

interface ImageProps {
    src: string;
}
interface MediaProps {
    block: ContentBlock;
    contentState: ContentState;
}
const Image = (props: ImageProps) => {
    if(!!props.src) {
        return <img src={props.src} />;
    }
    return null;
}
const Media = (props: MediaProps) => {
    const entity: EntityInstance = props.contentState.getEntity(props.block.getEntityAt(0));
    const { src } = entity.getData();
    const type = entity.getType();

    let media;

    if(type === 'image') {
        media = <Image src={src} />
    }
    return media;
}

export default Media;