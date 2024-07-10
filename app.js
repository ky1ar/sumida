document.getElementById('startButton').addEventListener('click', async () => {
    const video = document.getElementById('video');

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        video.srcObject = stream;
        video.play();
    }

    const codeReader = new ZXing.BrowserBarcodeReader();
    codeReader.decodeFromVideoDevice(null, 'video', (result, err) => {
        if (result) {
            console.log(result.text); // Aquí obtienes el código de barras
            alert(`Código de barras escaneado: ${result.text}`);
            // Aquí puedes detener la cámara si quieres
            const stream = video.srcObject;
            const tracks = stream.getTracks();

            tracks.forEach(track => {
                track.stop();
            });

            video.srcObject = null;
        }
        if (err && !(err instanceof ZXing.NotFoundException)) {
            console.error(err);
        }
    });
});
