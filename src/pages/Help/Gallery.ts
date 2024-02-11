const iconsPath = "../../icons/Screenshots/";

export const GettingStartedGalleryData = {
    images: {
        how_to_use_grindtracker_app: [
            {
                order: 1,
                src: "image1.jpg",
                title: "How to use GrindTracker?",
                alt: "How to use GrindTracker?",
            },
            {
                order: 2,
                src: "image2.jpg",
                title: "How to use GrindTracker? Part 2",
                alt: "How to use GrindTracker? Part 2",
            }
        ],
        how_to_addchange_default_character: [
            {
                order: 1,
                src: "image3.jpg",
                title: "How to add/change the default character?",
                alt: "How to add/change the default character?",
            },
            {
                order: 2,
                src: "image4.jpg",
                title: "How to add/change the default character? Part 2",
                alt: "How to add/change the default character? Part 2",
            }
        ],
        how_to_check_grindspot_statistics: [
            {
                order: 1,
                src: "image5.jpg",
                title: "How to check grindspot statistics?",
                alt: "How to check grindspot statistics?",
            },
            {
                order: 2,
                src: "image6.jpg",
                title: "How to check grindspot statistics? Part 2",
                alt: "How to check grindspot statistics? Part 2",
            }
        ],
        how_to_check_grindspot_item_drop_rates_per_hour: [
            {
                order: 1,
                src: "image7.jpg",
                title: "How to check grindspot item drop rates per hour?",
                alt: "How to check grindspot item drop rates per hour?",
            },
            {
                order: 2,
                src: "image8.jpg",
                title: "How to check grindspot item drop rates per hour? Part 2",
                alt: "How to check grindspot item drop rates per hour? Part 2",
            }
        ],
        how_to_correct_wrong_report_data: [
            {
                order: 1,
                src: "image9.jpg",
                title: "How to correct wrong report data?",
                alt: "How to correct wrong report data?",
            },
            {
                order: 2,
                src: "image10.jpg",
                title: "How to correct wrong report data? Part 2",
                alt: "How to correct wrong report data? Part 2",
            }
        ]
    }
}


for (const key in GettingStartedGalleryData.images) {
    if (GettingStartedGalleryData.images.hasOwnProperty(key)) {
        const gallery = GettingStartedGalleryData.images[key as keyof typeof GettingStartedGalleryData.images];
        gallery.forEach((img) => {
            img.src = iconsPath + img.src;
        });
    }
}

type GettingStartedGalleryData = {
    images: {
        [key: string]: {
            order: number;
            src: string;
            title: string;
            alt: string;
        }[];
    };
}; 
export type GettingStartedGalleryDataImage = GettingStartedGalleryData[keyof GettingStartedGalleryData][number];
