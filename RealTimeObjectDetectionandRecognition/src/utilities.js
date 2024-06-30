export const drawRect = (detections,ctx ) => {
    detections.forEach(prediction => {
        // Tahmin sonuçlarını al
        const[x,y,width,height]=prediction['bbox'];
        const text = prediction['class'];

        //Stilleri Ayarla 
        const color= '#' + Math.floor(Math.random()*16777215).toString(16);
        ctx.strokeSylt= color 
        ctx.font='18px Arial'
        ctx.fillStyle= color

        //Dikdörtgenler ve metinler için 
        ctx.beginPath()
        ctx.fillText(text,x,y)
        ctx.rect(x,y,width,height)
        ctx.stroke()

    });

}