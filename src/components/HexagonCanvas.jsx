import React, { useEffect, useRef } from 'react';

const HexagonCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const opts = {
      len: 60, // hexagons size
      count: 50,
      baseTime: 10,
      addedTime: 10,
      dieChance: 0.05,
      spawnChance: 1,
      sparkChance: 0.1,
      sparkDist: 10,
      sparkSize: 2,
      color: 'hsl(233, 100%, 75%)', //hue,saturation,lightness // 'hsl(200, 100%, 20%)',
      // color: '#7d8dff',(233, 100%, 75%)
      baseLight: 50, // base light for brightness
      addedLight: 10, // light for brightness variation
      shadowToTimePropMult: 6,
      baseLightInputMultiplier: 0.01,
      addedLightInputMultiplier: 0.02,
      cx: w / 2,
      cy: h / 2,
      cameraDistance: -1000, // Distance of the camera from canvas
      cameraAngleX: 0.3, // Angle of the camera along X axis (in radians)
      cameraYOffset: 100, // Offset along Y axis to simulate camera height
      backgroundColor: 'rgba(19, 19, 37, 0)', // New background color with transparency
    };

    let tick = 0;
    const lines = [];
    let dieX = w / 2 / opts.len;
    let dieY = h / 2 / opts.len;

    const baseRad = (Math.PI * 2) / 6;

    ctx.fillStyle = opts.backgroundColor;
    ctx.fillRect(0, 0, w, h);

    function loop() {
      window.requestAnimationFrame(loop);
      ++tick;
      ctx.globalCompositeOperation = 'source-over';
      ctx.shadowBlur = 0;
      ctx.fillStyle = opts.backgroundColor;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      if (lines.length < opts.count && Math.random() < opts.spawnChance) lines.push(new Line());

      lines.forEach(line => line.step());
    }

    function Line() {
      this.reset();
    }

    Line.prototype.reset = function () {
      this.x = 0;
      this.y = 0;
      this.addedX = 0;
      this.addedY = 0;

      this.rad = 0;

      this.lightInputMultiplier = opts.baseLightInputMultiplier + opts.addedLightInputMultiplier * Math.random();

      this.color = opts.color.replace('light', opts.baseLight);
      this.cumulativeTime = 0;

      this.beginPhase();
    };

    Line.prototype.beginPhase = function () {
      this.x += this.addedX;
      this.y += this.addedY;

      this.time = 0;
      this.targetTime = (opts.baseTime + opts.addedTime * Math.random()) | 0;

      this.rad += baseRad * (Math.random() < 0.5 ? 1 : -1);
      this.addedX = Math.cos(this.rad);
      this.addedY = Math.sin(this.rad);

      if (Math.random() < opts.dieChance || this.x > dieX || this.x < -dieX || this.y > dieY || this.y < -dieY) this.reset();
    };

    Line.prototype.step = function () {
      ++this.time;
      ++this.cumulativeTime;

      if (this.time >= this.targetTime) this.beginPhase();

      const prop = this.time / this.targetTime;
      const wave = Math.sin(prop * Math.PI / 2);
      const x = this.addedX * wave;
      const y = this.addedY * wave;

      // Calculate position with perspective
      const perspectiveFactor = opts.cameraDistance / (opts.cameraDistance + opts.cy + (this.y + y) * opts.len);
      const posX = opts.cx + (this.x + x) * opts.len * perspectiveFactor;
      const posY = opts.cy + (this.y + y) * opts.len * perspectiveFactor + opts.cameraYOffset;

      ctx.shadowBlur = prop * opts.shadowToTimePropMult;
      ctx.fillStyle = ctx.shadowColor = this.color.replace('light', opts.baseLight + opts.addedLight * Math.sin(this.cumulativeTime * this.lightInputMultiplier));
      ctx.fillRect(posX, posY, 2, 2);

      // if (Math.random() < opts.sparkChance)
      //   ctx.fillRect(
      //     posX + Math.random() * opts.sparkDist * (Math.random() < 0.5 ? 1 : -1) - opts.sparkSize / 2,
      //     posY + Math.random() * opts.sparkDist * (Math.random() < 0.5 ? 1 : -1) - opts.sparkSize / 2,
      //     opts.sparkSize,
      //     opts.sparkSize
      //   );
    };

    loop();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      ctx.fillStyle = opts.backgroundColor;
      ctx.fillRect(0, 0, w, h);

      opts.cx = w / 2;
      opts.cy = h / 2;

      dieX = w / 2 / opts.len;
      dieY = h / 2 / opts.len;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="hexagon-canvas" />;
};

export default HexagonCanvas;
