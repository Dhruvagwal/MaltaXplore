import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

// Dynamically import the MapContainer component to prevent SSR issues
const MapWithNoSSR = dynamic(() => import('./LeafletMapComponent'), {
  ssr: false,
});

const Map = () => <MapWithNoSSR />;

export default Map;
