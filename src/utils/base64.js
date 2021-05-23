export const encodeBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
        if ((encoded.length % 4) > 0) {
          encoded += '='.repeat(4 - (encoded.length % 4));
        }
        resolve(encoded);
      };
      reader.onerror = error => reject(error);
    });
  }


export const decodeBase64 = (file) => {
    var binary = atob(file.replace(/\s/g, ''));
    let length = binary.length;
    let buffer = new ArrayBuffer(length);
    let view = new Uint8Array(buffer);
    for (let i = 0; i < length; i++) {
        view[i] = binary.charCodeAt(i);
    }
    let blob = new Blob( [view], { type: "image/pdf" });
    let url = URL.createObjectURL(blob);
    return url;
}