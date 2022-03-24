type Section = {
    heading: string,
    type: 'list' | 'paragraph',
    content: Array<string>,
    subsections?: Array<Section>
}

type Document = {
    title: string,
    createdAt?: Date,
    updatedAt?: Date,
    author?: string,
    sections: Array<Section>
}

export { Document, Section }