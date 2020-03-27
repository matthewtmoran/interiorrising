interface IGalleryImage {
  itemId: string
  mediaUrl: string
  metaData: {
    type: string
    height?: number
    width?: number
    title?: string
    description?: string
    focalPoint?: number[]
    link?: {
      url: string
      target: string
    }
  }
}

export default IGalleryImage
