import { useEffect, useRef } from "react";
import L from 'leaflet';
import { MapPin } from "lucide-react";

interface Location {
  name: string;
  address: string;
  hours: string;
  phone: string;
  services: string[];
  coordinates: { lat: number; lng: number };
}

interface InteractiveMapProps {
  locations: Location[];
}

export function InteractiveMap({ locations }: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Delete default icon to prevent loading issues
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;

    // Bangkok center coordinates
    const bangkokCenter: [number, number] = [13.7563, 100.5018];

    // Initialize map
    const map = L.map(mapRef.current, {
      center: bangkokCenter,
      zoom: 13,
      zoomControl: true,
      scrollWheelZoom: true,
    });

    mapInstanceRef.current = map;

    // Add tile layer with a elegant, minimal style
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19,
    }).addTo(map);

    // Custom icon HTML
    const createCustomIcon = (index: number) => {
      return L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="relative">
            <div class="w-12 h-12 bg-[#C6A664] rounded-full flex items-center justify-center shadow-2xl border-4 border-white transform transition-transform hover:scale-110 cursor-pointer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div class="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md text-xs text-[#1A1A1A] border-2 border-[#C6A664] font-semibold">
              ${index + 1}
            </div>
          </div>
        `,
        iconSize: [48, 48],
        iconAnchor: [24, 48],
        popupAnchor: [0, -48],
      });
    };

    // Add markers for each location
    locations.forEach((location, index) => {
      const marker = L.marker(
        [location.coordinates.lat, location.coordinates.lng],
        { icon: createCustomIcon(index) }
      ).addTo(map);

      // Create popup content
      const popupContent = `
        <div class="p-3 min-w-[250px]">
          <h4 class="text-[#1A1A1A] mb-2" style="font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 600;">
            ${location.name}
          </h4>
          <p class="text-sm text-[#6B6B6B] mb-3">
            ${location.address}
          </p>
          <div class="flex flex-wrap gap-1 mb-3">
            ${location.services.map(service => 
              `<span class="text-xs px-2 py-1 bg-[#F8F5F1] text-[#1A1A1A] rounded-md">${service}</span>`
            ).join('')}
          </div>
          <div class="text-xs text-[#6B6B6B] space-y-1">
            <div class="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>${location.hours}</span>
            </div>
            <div class="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>${location.phone}</span>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, {
        className: 'custom-popup',
        maxWidth: 300,
      });
    });

    // Fit bounds to show all markers
    if (locations.length > 0) {
      const bounds = L.latLngBounds(
        locations.map(loc => [loc.coordinates.lat, loc.coordinates.lng])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [locations]);

  return (
    <div className="relative w-full h-96 rounded-xl overflow-hidden">
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Legend overlay */}
      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border border-[#C6A664]/20 z-[1000]">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#C6A664]" />
          <p className="text-xs text-[#6B6B6B]">{locations.length} Locations</p>
        </div>
      </div>

      <style>{`
        /* Leaflet core styles */
        .leaflet-pane,
        .leaflet-tile,
        .leaflet-marker-icon,
        .leaflet-marker-shadow,
        .leaflet-tile-container,
        .leaflet-pane > svg,
        .leaflet-pane > canvas,
        .leaflet-zoom-box,
        .leaflet-image-layer,
        .leaflet-layer {
          position: absolute;
          left: 0;
          top: 0;
        }
        
        .leaflet-container {
          overflow: hidden;
          -webkit-tap-highlight-color: transparent;
          background: #ddd;
          outline: 0;
        }
        
        .leaflet-tile,
        .leaflet-marker-icon,
        .leaflet-marker-shadow {
          -webkit-user-select: none;
          -moz-user-select: none;
          user-select: none;
          -webkit-user-drag: none;
        }
        
        .leaflet-marker-icon,
        .leaflet-marker-shadow {
          display: block;
        }
        
        .leaflet-container img {
          max-width: none !important;
          max-height: none !important;
        }
        
        .leaflet-container img.leaflet-tile {
          width: 256px;
          height: 256px;
          padding: 0;
          border-radius: 0;
        }
        
        .leaflet-tile-pane {
          z-index: 200;
        }
        
        .leaflet-overlay-pane {
          z-index: 400;
        }
        
        .leaflet-shadow-pane {
          z-index: 500;
        }
        
        .leaflet-marker-pane {
          z-index: 600;
        }
        
        .leaflet-tooltip-pane {
          z-index: 650;
        }
        
        .leaflet-popup-pane {
          z-index: 700;
        }
        
        .leaflet-map-pane canvas {
          z-index: 100;
        }
        
        .leaflet-map-pane svg {
          z-index: 200;
        }
        
        .leaflet-control {
          position: relative;
          z-index: 800;
          pointer-events: visiblePainted;
          pointer-events: auto;
        }
        
        .leaflet-top,
        .leaflet-bottom {
          position: absolute;
          z-index: 1000;
          pointer-events: none;
        }
        
        .leaflet-top {
          top: 0;
        }
        
        .leaflet-right {
          right: 0;
        }
        
        .leaflet-bottom {
          bottom: 0;
        }
        
        .leaflet-left {
          left: 0;
        }
        
        .leaflet-control {
          float: left;
          clear: both;
        }
        
        .leaflet-right .leaflet-control {
          float: right;
        }
        
        .leaflet-top .leaflet-control {
          margin-top: 10px;
        }
        
        .leaflet-bottom .leaflet-control {
          margin-bottom: 10px;
        }
        
        .leaflet-left .leaflet-control {
          margin-left: 10px;
        }
        
        .leaflet-right .leaflet-control {
          margin-right: 10px;
        }
        
        .leaflet-fade-anim .leaflet-tile {
          will-change: opacity;
        }
        
        .leaflet-fade-anim .leaflet-popup {
          opacity: 0;
          -webkit-transition: opacity 0.2s linear;
          -moz-transition: opacity 0.2s linear;
          transition: opacity 0.2s linear;
        }
        
        .leaflet-fade-anim .leaflet-map-pane .leaflet-popup {
          opacity: 1;
        }
        
        .leaflet-zoom-animated {
          -webkit-transform-origin: 0 0;
          -ms-transform-origin: 0 0;
          transform-origin: 0 0;
        }
        
        .leaflet-zoom-anim .leaflet-zoom-animated {
          will-change: transform;
          -webkit-transition: -webkit-transform 0.25s cubic-bezier(0, 0, 0.25, 1);
          -moz-transition: -moz-transform 0.25s cubic-bezier(0, 0, 0.25, 1);
          transition: transform 0.25s cubic-bezier(0, 0, 0.25, 1);
        }
        
        .leaflet-pan-anim .leaflet-tile,
        .leaflet-touching .leaflet-zoom-animated {
          -webkit-transition: none;
          -moz-transition: none;
          transition: none;
        }
        
        .leaflet-zoom-anim .leaflet-zoom-hide {
          visibility: hidden;
        }
        
        .leaflet-interactive {
          cursor: pointer;
        }
        
        .leaflet-grab {
          cursor: -webkit-grab;
          cursor: -moz-grab;
          cursor: grab;
        }
        
        .leaflet-crosshair,
        .leaflet-crosshair .leaflet-interactive {
          cursor: crosshair;
        }
        
        .leaflet-popup-pane,
        .leaflet-control {
          cursor: auto;
        }
        
        .leaflet-dragging .leaflet-grab,
        .leaflet-dragging .leaflet-grab .leaflet-interactive,
        .leaflet-dragging .leaflet-marker-draggable {
          cursor: move;
          cursor: -webkit-grabbing;
          cursor: -moz-grabbing;
          cursor: grabbing;
        }
        
        .leaflet-bar {
          box-shadow: 0 1px 5px rgba(0, 0, 0, 0.65);
          border-radius: 4px;
        }
        
        .leaflet-bar a,
        .leaflet-bar a:hover {
          background-color: #fff;
          border-bottom: 1px solid #ccc;
          width: 26px;
          height: 26px;
          line-height: 26px;
          display: block;
          text-align: center;
          text-decoration: none;
          color: black;
        }
        
        .leaflet-bar a,
        .leaflet-control-layers-toggle {
          background-position: 50% 50%;
          background-repeat: no-repeat;
          display: block;
        }
        
        .leaflet-bar a:hover {
          background-color: #f4f4f4;
        }
        
        .leaflet-bar a:first-child {
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
        }
        
        .leaflet-bar a:last-child {
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
          border-bottom: none;
        }
        
        .leaflet-bar a.leaflet-disabled {
          cursor: default;
          background-color: #f4f4f4;
          color: #bbb;
        }
        
        .leaflet-touch .leaflet-bar a {
          width: 30px;
          height: 30px;
          line-height: 30px;
        }
        
        .leaflet-control-zoom-in,
        .leaflet-control-zoom-out {
          font: bold 18px 'Lucida Console', Monaco, monospace;
          text-indent: 1px;
        }
        
        .leaflet-touch .leaflet-control-zoom-in,
        .leaflet-touch .leaflet-control-zoom-out {
          font-size: 22px;
        }
        
        .leaflet-control-layers {
          box-shadow: 0 1px 5px rgba(0, 0, 0, 0.4);
          background: #fff;
          border-radius: 5px;
        }
        
        .leaflet-control-layers-toggle {
          width: 36px;
          height: 36px;
        }
        
        .leaflet-retina .leaflet-control-layers-toggle {
          background-size: 26px 26px;
        }
        
        .leaflet-touch .leaflet-control-layers-toggle {
          width: 44px;
          height: 44px;
        }
        
        .leaflet-control-layers .leaflet-control-layers-list,
        .leaflet-control-layers-expanded .leaflet-control-layers-toggle {
          display: none;
        }
        
        .leaflet-control-layers-expanded .leaflet-control-layers-list {
          display: block;
          position: relative;
        }
        
        .leaflet-control-layers-expanded {
          padding: 6px 10px 6px 6px;
          color: #333;
          background: #fff;
        }
        
        .leaflet-control-layers-scrollbar {
          overflow-y: scroll;
          overflow-x: hidden;
          padding-right: 5px;
        }
        
        .leaflet-control-layers-selector {
          margin-top: 2px;
          position: relative;
          top: 1px;
        }
        
        .leaflet-control-layers label {
          display: block;
        }
        
        .leaflet-control-layers-separator {
          height: 0;
          border-top: 1px solid #ddd;
          margin: 5px -10px 5px -6px;
        }
        
        .leaflet-container .leaflet-control-attribution {
          background: #fff;
          background: rgba(255, 255, 255, 0.7);
          margin: 0;
        }
        
        .leaflet-control-attribution,
        .leaflet-control-scale-line {
          padding: 0 5px;
          color: #333;
        }
        
        .leaflet-control-attribution a {
          text-decoration: none;
        }
        
        .leaflet-control-attribution a:hover {
          text-decoration: underline;
        }
        
        .leaflet-container .leaflet-control-attribution,
        .leaflet-container .leaflet-control-scale {
          font-size: 11px;
        }
        
        .leaflet-left .leaflet-control-scale {
          margin-left: 5px;
        }
        
        .leaflet-bottom .leaflet-control-scale {
          margin-bottom: 5px;
        }
        
        .leaflet-control-scale-line {
          border: 2px solid #777;
          border-top: none;
          line-height: 1.1;
          padding: 2px 5px 1px;
          font-size: 11px;
          white-space: nowrap;
          overflow: hidden;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          background: #fff;
          background: rgba(255, 255, 255, 0.5);
        }
        
        .leaflet-control-scale-line:not(:first-child) {
          border-top: 2px solid #777;
          border-bottom: none;
          margin-top: -2px;
        }
        
        .leaflet-control-scale-line:not(:first-child):not(:last-child) {
          border-bottom: 2px solid #777;
        }
        
        .leaflet-touch .leaflet-control-attribution,
        .leaflet-touch .leaflet-control-layers,
        .leaflet-touch .leaflet-bar {
          box-shadow: none;
        }
        
        .leaflet-touch .leaflet-control-layers,
        .leaflet-touch .leaflet-bar {
          border: 2px solid rgba(0, 0, 0, 0.2);
          background-clip: padding-box;
        }
        
        .leaflet-popup {
          position: absolute;
          text-align: center;
          margin-bottom: 20px;
        }
        
        .leaflet-popup-content-wrapper {
          padding: 1px;
          text-align: left;
          border-radius: 12px;
        }
        
        .leaflet-popup-content {
          margin: 13px 19px;
          line-height: 1.4;
        }
        
        .leaflet-popup-content p {
          margin: 18px 0;
        }
        
        .leaflet-popup-tip-container {
          width: 40px;
          height: 20px;
          position: absolute;
          left: 50%;
          margin-left: -20px;
          overflow: hidden;
          pointer-events: none;
        }
        
        .leaflet-popup-tip {
          width: 17px;
          height: 17px;
          padding: 1px;
          margin: -10px auto 0;
          -webkit-transform: rotate(45deg);
          -moz-transform: rotate(45deg);
          -ms-transform: rotate(45deg);
          transform: rotate(45deg);
        }
        
        .leaflet-popup-content-wrapper,
        .leaflet-popup-tip {
          background: white;
          color: #333;
          box-shadow: 0 3px 14px rgba(0, 0, 0, 0.4);
        }
        
        .leaflet-container a.leaflet-popup-close-button {
          position: absolute;
          top: 0;
          right: 0;
          padding: 4px 4px 0 0;
          border: none;
          text-align: center;
          width: 18px;
          height: 14px;
          font: 16px/14px Tahoma, Verdana, sans-serif;
          color: #c3c3c3;
          text-decoration: none;
          font-weight: bold;
          background: transparent;
        }
        
        .leaflet-container a.leaflet-popup-close-button:hover {
          color: #999;
        }
        
        .leaflet-popup-scrolled {
          overflow: auto;
          border-bottom: 1px solid #ddd;
          border-top: 1px solid #ddd;
        }
        
        .leaflet-oldie .leaflet-popup-content-wrapper {
          zoom: 1;
        }
        
        .leaflet-oldie .leaflet-popup-tip {
          width: 24px;
          margin: 0 auto;
          -ms-filter: "progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)";
          filter: progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678);
        }
        
        .leaflet-oldie .leaflet-popup-tip-container {
          margin-top: -1px;
        }
        
        .leaflet-oldie .leaflet-control-zoom,
        .leaflet-oldie .leaflet-control-layers,
        .leaflet-oldie .leaflet-popup-content-wrapper,
        .leaflet-oldie .leaflet-popup-tip {
          border: 1px solid #999;
        }
        
        .leaflet-div-icon {
          background: #fff;
          border: 1px solid #666;
        }
        
        .leaflet-tooltip {
          position: absolute;
          padding: 6px;
          background-color: #fff;
          border: 1px solid #fff;
          border-radius: 3px;
          color: #222;
          white-space: nowrap;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          pointer-events: none;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
        }
        
        .leaflet-tooltip.leaflet-clickable {
          cursor: pointer;
          pointer-events: auto;
        }
        
        .leaflet-tooltip-top:before,
        .leaflet-tooltip-bottom:before,
        .leaflet-tooltip-left:before,
        .leaflet-tooltip-right:before {
          position: absolute;
          pointer-events: none;
          border: 6px solid transparent;
          background: transparent;
          content: "";
        }
        
        .leaflet-tooltip-bottom {
          margin-top: 6px;
        }
        
        .leaflet-tooltip-top {
          margin-top: -6px;
        }
        
        .leaflet-tooltip-bottom:before,
        .leaflet-tooltip-top:before {
          left: 50%;
          margin-left: -6px;
        }
        
        .leaflet-tooltip-top:before {
          bottom: 0;
          margin-bottom: -12px;
          border-top-color: #fff;
        }
        
        .leaflet-tooltip-bottom:before {
          top: 0;
          margin-top: -12px;
          margin-left: -6px;
          border-bottom-color: #fff;
        }
        
        .leaflet-tooltip-left {
          margin-left: -6px;
        }
        
        .leaflet-tooltip-right {
          margin-left: 6px;
        }
        
        .leaflet-tooltip-left:before,
        .leaflet-tooltip-right:before {
          top: 50%;
          margin-top: -6px;
        }
        
        .leaflet-tooltip-left:before {
          right: 0;
          margin-right: -12px;
          border-left-color: #fff;
        }
        
        .leaflet-tooltip-right:before {
          left: 0;
          margin-left: -12px;
          border-right-color: #fff;
        }
        
        /* Custom styles */
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
        
        .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          border: 1px solid rgba(198, 166, 100, 0.2);
          font-family: 'Inter', sans-serif;
        }
        
        .leaflet-popup-content {
          margin: 0;
          font-family: 'Inter', sans-serif;
        }
        
        .leaflet-popup-tip {
          background: white;
          border: 1px solid rgba(198, 166, 100, 0.2);
        }
        
        .leaflet-container {
          background: #F8F5F1;
          font-family: 'Inter', sans-serif;
        }
        
        .leaflet-control-zoom a {
          background: white !important;
          border: 1px solid rgba(26, 26, 26, 0.08) !important;
          color: #1A1A1A !important;
        }
        
        .leaflet-control-zoom a:hover {
          background: #F8F5F1 !important;
          border-color: #C6A664 !important;
        }
      `}</style>
    </div>
  );
}
