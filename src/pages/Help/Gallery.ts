const iconsPath = "../../icons/Screenshots/";

export const GettingStartedGalleryData = {
    images: [
        [
            {
                order: 1,
                src: "image.jpg",
                alt: "Getting Started",
                title: "Getting Started"
            },
            {
                order: 2,
                src: "Screenshot_1.png",
                alt: "Getting Started2",
                title: "Getting Started2"
            }
        ]
    ],
}

GettingStartedGalleryData.images.forEach((image) => {
    image.forEach((img) => {
        img.src = iconsPath + img.src;
    })
});

export type GettingStartedGalleryDataType = typeof GettingStartedGalleryData;
export type GettingStartedGalleryDataImages = GettingStartedGalleryDataType["images"][0];
export type GettingStartedGalleryDataImage = GettingStartedGalleryDataType["images"][0][0];