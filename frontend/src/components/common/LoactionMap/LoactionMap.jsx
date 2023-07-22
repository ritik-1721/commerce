"use client";


import { Map, Marker, ZoomControl } from "pigeon-maps";
import { osm } from "pigeon-maps/providers";

export default function LoactionMap() {
  return (
    <Map
      provider={osm}
      dprs={[1, 2]} // this provider supports HiDPI tiles
      height={200}
      defaultCenter={[23.19128537138261, 77.43211658465933]}
      defaultZoom={11}
    >
      <ZoomControl />
      <Marker width={40} anchor={[23.19128537138261, 77.43211658465933]} />
    </Map>
  );
}
