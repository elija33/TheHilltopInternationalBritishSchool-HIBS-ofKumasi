// Client-side image compression before persisting to localStorage. A
// straight-off-camera photo (often several MB — see the 2.7-3.6MB files
// used on the homepage) would blow through localStorage's ~5-10MB quota in
// just a couple of uploads, so every upload is downscaled and re-encoded
// as JPEG here before anything is stored.
export const compressImageFile = (file, { maxDimension = 1000, quality = 0.82 } = {}) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read that file."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("That file doesn't look like a valid image."));
      img.onload = () => {
        const scale = Math.min(1, maxDimension / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
