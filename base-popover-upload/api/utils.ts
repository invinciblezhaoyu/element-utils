export default {
  arrayBufferToBase64(buffer: ArrayBuffer) {
    let binary = '';
    const bytes = new Uint8Array( buffer );
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  },

  fileToArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((reslove, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = (e) => {
        const data = e as any;
        reslove(data.target.result);
      }
    }) 
  },


}
