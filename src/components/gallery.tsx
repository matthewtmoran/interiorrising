import React from "react"
import IGalleryImage from "./../interfaces/IGalleryImage"
import { ExpandableProGallery } from "pro-gallery"
import "pro-gallery/dist/statics/main.css"
import "../styles/gallery.scss"

interface IGallery {
  images: IGalleryImage[]
}

const container = {
  width: "100%",
  height: 500,
}

const options = {
  galleryLayout: 1,
  imageMargin: 10,
  cubeRatio: 1,
  gallerySize: 30,
  allowTitle: false,
  allowSocial: false,
  loveButton: false,
  enableInfiniteScroll: true,
  loadMoreAmount: "partial",
  hoveringBehaviour: "APPEARS",
  itemClick: "expand",
  galleryHorizontalAlign: "center",
  galleryVerticalAlign: "center",
  calculateTextBoxWidthMode: "PERCENT",
  textBoxWidthPercent: 50,
  textBoxWidth: 200,
  overlayAnimation: "NO_EFFECT",
  imageHoverAnimation: "NO_EFFECT",
  imageLoadingMode: "BLUR",
  scrollAnimation: "FADE_IN",
  imageQuality: 90,
  videoPlay: "hover",
  videoSpeed: "1",
  videoLoop: true,
}

const Gallery: React.FunctionComponent<IGallery> = ({ images }) => {
  return (
    <ExpandableProGallery
      domId={Date.now()}
      items={images}
      options={options}
      container={container}
      lazyLoad={true}
      scrollingElement={() => document.getElementById("gallery") || window}
    />
  )
}

export default Gallery
