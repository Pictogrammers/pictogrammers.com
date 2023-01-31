import { RefObject, useEffect, useRef } from 'react';

import PreviewBlank from '../public/images/tools/preview-blank.png';
import PreviewBlankWip from '../public/images/tools/preview-blank-wip.png';

// TODO: The supporting background images should be generated programatically,
// so we can support other grid sizes in the future for different libraries.

const usePreviewCanvas = (iconName: string, iconPath: string, workInProgress: boolean, iconShadow?: string): RefObject<HTMLCanvasElement> => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const renderPreview = async () => {
      if (!canvasRef.current) {
        return;
      }

      const context = canvasRef.current.getContext('2d');
      if (!context) {
        return;
      }

      const bgImage = await loadImage(workInProgress ? PreviewBlankWip.src : PreviewBlank.src);
      const dataImage = await generatePreview(iconName, iconPath, workInProgress, iconShadow);
      context.drawImage(bgImage, 0, 0);
      context.drawImage(dataImage, 0, 0);
    };

    renderPreview();
  }, [ iconName, iconPath, iconShadow, workInProgress ]);

  return canvasRef;
};

const loadImage = async (url: string): Promise<HTMLImageElement> => new Promise((resolve, reject) => {
  const img = new Image();
  img.addEventListener('load', () => resolve(img));
  img.addEventListener('error', (err) => reject(err));
  img.src = url;
});

const getIconSvgPath = (data: string, x: Number, y: Number, scale: Number, isWorkInProgress: boolean, shadow?: boolean): SVGPathElement => {
  const color = isWorkInProgress ? 'FFF' : '8B8B8B';

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', data);
  path.setAttribute('fill', `#${color}`);
  path.setAttribute('transform', `translate(${x},${y}) scale(${scale},${scale})`);

  if (shadow) {
    path.setAttribute('fill', 'rgba(0, 0, 0, 0.2)');
    path.setAttribute('stroke', '#000');
    path.setAttribute('stroke-width', '0.05');
    path.setAttribute('stroke-dasharray', '0.5 0.2');
  }

  return path;
};

const getPngFromSvg = async (svgElement: SVGSVGElement) => {
  const svg = new XMLSerializer().serializeToString(svgElement);
  return loadImage(`data:image/svg+xml;charset=utf8,${encodeURIComponent(svg)}`);
};

const generatePreview = async (name: string, data: string, isWorkInProgress: boolean, shadow?: string) => {
  const paths = [
    getIconSvgPath(data, 11, 10, 1, isWorkInProgress),
    getIconSvgPath(data, 11, 44, 2, isWorkInProgress),
    getIconSvgPath(data, 70, 10, 10, isWorkInProgress)
  ];

  if (shadow) {
    paths.push(getIconSvgPath(shadow, 70, 10, 10, isWorkInProgress, true));
  }

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 325 294');
  paths.forEach((path) => svg.appendChild(path));

  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.setAttribute('transform', 'translate(11, 283)');
  text.setAttribute('fill', '#555');
  text.style.fontFamily = 'Segoe UI,Roboto,Arial';
  text.style.fontSize = '12pt';
  text.textContent = name;
  svg.appendChild(text);

  return getPngFromSvg(svg);
};

export default usePreviewCanvas;
