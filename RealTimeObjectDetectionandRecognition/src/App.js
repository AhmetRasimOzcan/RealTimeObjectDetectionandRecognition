// Bağımlılıkları içe aktar
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
// 1. TODO - Gerekli modeli burada içe aktarın
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import "./App.css";
// 2. TODO - Çizim yardımcı aracını burada içe aktarın

import { drawRect } from "./utilities";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Ana fonksiyon
  const runCoco = async () => {
    // 3. TODO - Ağı yükle
    // Örneğin, const net = await cocossd.load();
    const net = await cocossd.load();
    // Döngü yap ve nesneleri tespit et
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    // Verilerin mevcut olup olmadığını kontrol et
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Video özelliklerini al
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Video genişliğini ayarla
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Kanvas yüksekliğini ve genişliğini ayarla
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // 4. TODO - Tespitler yap
      // Örneğin, const obj = await net.detect(video);
      const obj = await net.detect(video);
      console.log(obj);

      // Ağ çiz
      const ctx = canvasRef.current.getContext("2d");

      // 5. TODO - Çizim yardımcı aracını güncelle
      // drawSomething(obj, ctx)  
      drawRect(obj, ctx);
    }
  };

  useEffect(() => { runCoco() }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true} 
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default App;
