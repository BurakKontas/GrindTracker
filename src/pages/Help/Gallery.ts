const iconsPath = "../../icons/Screenshots/";

export const GettingStartedGalleryData: GettingStartedGalleryData = {
    images: {
        how_to_use_grindtracker_app: [
            {
                src: "how_to_use_grindtracker_app/image.jpg",
                title: "Start GrindTracker",
                alt: "Just start Black Desert Online and GrindTracker will start automatically. You can also start it manually by clicking on the GrindTracker icon in the taskbar.",
            },
            {
                src: "how_to_use_grindtracker_app/Screenshot_1.png",
                title: "How to use GrindTracker? Part 2",
                alt: "How to use GrindTracker? Part 2",
            }
        ],
        how_to_addchange_default_character: [
            {
                src: "image3.jpg",
                title: "How to add/change the default character?",
                alt: "How to add/change the default character?",
            },
            {
                src: "image4.jpg",
                title: "How to add/change the default character? Part 2",
                alt: "How to add/change the default character? Part 2",
            }
        ],
        how_to_check_grindspot_statistics: [
            {
                src: "image5.jpg",
                title: "How to check grindspot statistics?",
                alt: "How to check grindspot statistics?",
            },
            {
                src: "image6.jpg",
                title: "How to check grindspot statistics? Part 2",
                alt: "How to check grindspot statistics? Part 2",
            }
        ],
        how_to_check_grindspot_item_drop_rates_per_hour: [
            {
                src: "image7.jpg",
                title: "How to check grindspot item drop rates per hour?",
                alt: "How to check grindspot item drop rates per hour?",
            },
            {
                src: "image8.jpg",
                title: "How to check grindspot item drop rates per hour? Part 2",
                alt: "How to check grindspot item drop rates per hour? Part 2",
            }
        ],
        how_to_correct_wrong_report_data: [
            {
                src: "image9.jpg",
                title: "How to correct wrong report data?",
                alt: "How to correct wrong report data?",
            },
            {
                src: "image10.jpg",
                title: "How to correct wrong report data? Part 2",
                alt: "How to correct wrong report data? Part 2",
            }
        ],
        how_to_change_hotkeys: [
            {
                src: "image11.jpg",
                title: "How to change hotkeys?",
                alt: "How to change hotkeys?",
            },
            {
                src: "image12.jpg",
                title: "How to change hotkeys? Part 2",
                alt: "How to change hotkeys? Part 2",
            }
        ],
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
            src: string;
            title: string;
            alt: string;
        }[];
    };
}; 
export type GettingStartedGalleryDataImage = GettingStartedGalleryData[keyof GettingStartedGalleryData][number];
