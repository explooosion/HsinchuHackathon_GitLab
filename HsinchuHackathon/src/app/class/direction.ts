import { Marker } from './marker';

/**
 * 路徑AB兩點
 */
export class Direction {
    public origin: Marker;
    public destination: Marker;
    constructor(origin: Marker, destination: Marker) {
        this.origin = origin;
        this.destination = destination;
    }
}