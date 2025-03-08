<script setup lang="ts">
import { ref } from 'vue';

const canvas = ref<HTMLCanvasElement | null>(null);
let img = new Image();
let imgX = ref<number>(0);
let imgY = ref<number>(0);
let isDragging = ref<boolean>(false);
let dragStartX = ref<number>(0);
let dragStartY = ref<number>(0);
let imgScale = ref<number>(1);
let boundaryLeftX = ref<number>(0);
let boundaryRightX = ref<number>(0);
let boundaryTopY = ref<number>(0);
let boundaryBottomY = ref<number>(0);

const canvasWidth = ref<number>(0);
const canvasHeight = ref<number>(0);

const canvasAspectRatio = (810 / 452.41);
const isResize = ref<ReturnType<typeof setTimeout> | null>(null);

const stage = ref<'upload' | 'crop'>('upload');




const handleImageUpload = (e: Event) => {
    const fileInput = e.target as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            img.src = event.target?.result as string;
        };
        reader.readAsDataURL(file);
    }
};

img.onload = () => {
    render(true);
};

const render = (isInit?: boolean, isResize?: boolean) => {
    if (isInit) {
        imgX.value = 0;
        imgY.value = 0;
        imgScale.value = 1;
    }

    if (canvas.value) {
        const ctx = canvas.value.getContext('2d');
        canvasWidth.value = window.innerWidth > 810 ? 810 : window.innerWidth;
        canvasHeight.value = canvasWidth.value / canvasAspectRatio;
        if (ctx) {
            ctx.clearRect(0, 0, 1920, 1080);
            const imgWidth = img.width
            const imgHeight = img.height;
            let imgW = imgWidth > canvasWidth.value ? canvasWidth.value : imgWidth;
            let imgH = imgW / (imgWidth / imgHeight) > canvasHeight.value
                ? canvasHeight.value
                : imgW / (imgWidth / imgHeight);

            imgW = imgH / (imgHeight / imgWidth);

            let x = imgX.value;
            let y = imgY.value;

            const radius = Math.min(imgW, imgH) / 2;
            if (isInit) {
                x = imgX.value = (canvasWidth.value - imgW) / 2;
                y = imgY.value = (canvasHeight.value - imgH) / 2;
                boundaryLeftX.value = (canvasWidth.value - (radius * 2)) / 2;
                boundaryTopY.value = (canvasHeight.value - (radius * 2)) / 2;
            }

            if (isResize) {
                x = imgX.value = (canvasWidth.value - imgW) / 2;
                y = imgY.value = (canvasHeight.value - imgH) / 2;
                boundaryLeftX.value = (canvasWidth.value - (radius * 2)) / 2;
                boundaryTopY.value = (canvasHeight.value - (radius * 2)) / 2;
            }


            if (imgScale.value > 1) {
                imgW *= imgScale.value;
                imgH *= imgScale.value;
            }

            if (y > boundaryTopY.value) {
                y = boundaryTopY.value;
                imgY.value = y;
            }

            if (x > boundaryLeftX.value) {
                x = boundaryLeftX.value;
                imgX.value = x;
            }

            boundaryRightX.value = (imgW - (radius * 2) - boundaryLeftX.value)
            boundaryBottomY.value = (imgH - (radius * 2) - boundaryTopY.value)

            if (x < -boundaryRightX.value) {
                x = -boundaryRightX.value;
                imgX.value = x;
            }

            if (y < -boundaryBottomY.value) {
                y = -boundaryBottomY.value;
                imgY.value = y;
            }



            // Clear the canvas and draw the white background
            ctx.clearRect(0, 0, canvasWidth.value, canvasHeight.value);
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvasWidth.value, canvasHeight.value);

            // Draw the image
            ctx.drawImage(img, x, y, imgW, imgH);



            // Set stroke properties for both shapes
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 1;

            // Draw the semi-transparent overlay over the entire canvas
            ctx.beginPath();
            ctx.rect(0, 0, canvasWidth.value, canvasHeight.value);

            ctx.arc(canvasWidth.value / 2, canvasHeight.value / 2, radius, 0, Math.PI * 2, true);

            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fill('evenodd');
        }
    }

}



const startDrag = (e: MouseEvent) => {
    isDragging.value = true;
    dragStartX.value = e.clientX - imgX.value;
    dragStartY.value = e.clientY - imgY.value;
};

const stopDrag = () => {
    isDragging.value = false;
};

const dragImage = (e: MouseEvent) => {
    if (isDragging.value) {

        imgX.value = e.clientX - dragStartX.value;
        imgY.value = e.clientY - dragStartY.value;
        render()
    }
};

const scaleImage = (e: WheelEvent) => {
    isDragging.value = false;
    e.preventDefault();
    let scaleAmount = e.deltaY < 0 ? 0.1 : -0.1;
    //slow the scale amount
    scaleAmount = scaleAmount * 0.05;
    imgScale.value = (Math.max(0.1, imgScale.value + scaleAmount))
    render();
};

const setupMouseListeners = () => {
    const canvasElement = canvas.value;

    if (canvasElement) {
        canvasElement.addEventListener('mousedown', startDrag);
        canvasElement.addEventListener('mousemove', dragImage);
        canvasElement.addEventListener('mouseup', stopDrag);
        canvasElement.addEventListener('mouseleave', stopDrag);
        canvasElement.addEventListener('wheel', scaleImage);

    }
};

const handerResize = () => {

    isResize.value = setTimeout(() => {
        window.innerWidth > 810 ? canvasWidth.value = 810 : canvasWidth.value = window.innerWidth;
        canvasHeight.value = canvasWidth.value / canvasAspectRatio;
        render(false, true);
    }, 100);
};

onMounted(() => {
    window.innerWidth > 810 ? canvasWidth.value = 810 : canvasWidth.value = window.innerWidth;
    canvasHeight.value = canvasWidth.value / canvasAspectRatio;

    window.addEventListener('resize', handerResize);

    setupMouseListeners();
    handerResize();
});

onUnmounted(() => {
    const canvasElement = canvas.value;

    if (canvasElement) {
        canvasElement.removeEventListener('mousedown', startDrag);
        canvasElement.removeEventListener('mousemove', dragImage);
        canvasElement.removeEventListener('mouseup', stopDrag);
        canvasElement.removeEventListener('mouseleave', stopDrag);
        canvasElement.addEventListener('wheel', scaleImage);
    }

    window.removeEventListener('resize', handerResize);
});


const previewAndSave = (isSave: boolean) => {
    const isInit = false;

    if (isInit) {
        imgX.value = 0;
        imgY.value = 0;
        imgScale.value = 1;
    }

    if (canvas.value) {
        const ctx = canvas.value.getContext('2d');
        canvasWidth.value = 810
        canvasHeight.value = 452.41;
        if (ctx) {
            ctx.clearRect(0, 0, canvasWidth.value, canvasHeight.value);
            const imgWidth = img.width
            const imgHeight = img.height;

            let imgW = imgWidth > canvasWidth.value ? canvasWidth.value : imgWidth;
            let imgH = imgW / (imgWidth / imgHeight) > canvasHeight.value
                ? canvasHeight.value
                : imgW / (imgWidth / imgHeight);

            imgW = imgH / (imgHeight / imgWidth);

            let x = imgX.value;
            let y = imgY.value;

            const radius = Math.min(imgW, imgH) / 2;
            const scaleFactor = img.width / imgW > img.height / imgH ? img.width / imgW : img.height / imgH;

            if (isInit) {
                x = imgX.value = (canvasWidth.value - imgW) / 2;
                y = imgY.value = (canvasHeight.value - imgH) / 2;
                boundaryLeftX.value = (810 - (radius * 2)) / 2;
                boundaryTopY.value = (452.41 - (radius * 2)) / 2;
            }


            if (imgScale.value > 1) {
                imgW *= imgScale.value;
                imgH *= imgScale.value;
            }

            if (y > boundaryTopY.value) {
                y = boundaryTopY.value;
                imgY.value = y;
            }

            if (x > boundaryLeftX.value) {
                x = boundaryLeftX.value;
                imgX.value = x;
            }

            boundaryRightX.value = (imgW - (radius * 2) - boundaryLeftX.value)
            boundaryBottomY.value = (imgH - (radius * 2) - boundaryTopY.value)

            if (x < -boundaryRightX.value) {
                x = -boundaryRightX.value;
                imgX.value = x;
            }

            if (y < -boundaryBottomY.value) {
                y = -boundaryBottomY.value;
                imgY.value = y;
            }


            // ctx.rect(, (canvasHeight.value - radius * 2) / 2, radius * 2, radius * 2);

            const squareX = (canvasWidth.value - radius * 2) / 2
            const squareY = (canvasHeight.value - radius * 2) / 2

            // Clear the canvas and draw the white background
            ctx.clearRect(squareX, squareY, canvasWidth.value, canvasHeight.value);

            //draw the square
            ctx.beginPath();
            ctx.rect(squareX, squareY, radius * 2, radius * 2);
            ctx.clip();

            // Draw the image
            ctx.drawImage(img, x, y, imgW, imgH);
            ctx.fillStyle = 'white';

            const squareSide = radius * 2;

            // Draw the semi-transparent overlay over the entire canvas
            const captureCanvas = document.createElement('canvas');
            captureCanvas.width = squareSide * scaleFactor; // Set capture canvas width to scaled squareSide
            captureCanvas.height = squareSide * scaleFactor; //
            const captureCtx = captureCanvas.getContext('2d');

            if (captureCtx) {
                captureCtx.scale(scaleFactor, scaleFactor); // Scale context to increase drawing resolution
                captureCtx.clearRect(0, 0, squareSide, squareSide);
                // DrawImage with source rectangle defined by squareX, squareY, squareSide
                captureCtx.drawImage(
                    canvas.value,
                    squareX,
                    squareY,
                    squareSide,
                    squareSide,
                    0,
                    0,
                    squareSide,
                    squareSide
                );

                captureCtx.scale(1 / scaleFactor, 1 / scaleFactor);

                if (isSave) {

                    const dataURL = captureCanvas.toDataURL('image/png');
                    const downloadLink = document.createElement('a');
                    downloadLink.href = dataURL;
                    downloadLink.download = 'square_cropped_image_only.png';
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                }
            }


        }
    }


};





</script>

<template>
    <div class="w-auto h-auto flex flex-col justify-start items-start gap-4 z-30">
        <div class="relative bg-white flex flex-col justify-center items-center p-10 pt-4 gap-2 rounded-md"
            :style="`width: ${canvasWidth}px ;`">
            <div class="w-full h-auto flex justify-between items-end font-[500] font-shatoshi">
                <div class="w-auto h-auto flex justify-start items-center">
                </div>
                <p>Upload Your Avatar</p>
            </div>
            <!-- upload -->
            <!-- <div class="flex items-center justify-center w-full" v-if="stage === 'crop'">
                <label for="dropzone-file"
                    class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12">
                            </path>
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to
                                upload</span> or drag and drop</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                    </div>
                    <input id="dropzone-file" type="file" @change="handleImageUpload" class="hidden" />
                </label>
            </div> -->
            <div class="z-40 w-auto h-auto" v-if="stage === 'upload'">
                <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
                <input id="dropzone-file" type="file" @change="handleImageUpload" />
                <div class="size-10 bg-white" @click="previewAndSave(false)">Preview</div>
                <div class="size-10 bg-white" @click="previewAndSave(true)">Upload</div>
            </div>

        </div>
    </div>

</template>
