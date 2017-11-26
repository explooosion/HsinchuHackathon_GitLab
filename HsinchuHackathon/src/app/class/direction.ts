import { Marker } from './marker';

/**
 * 路徑AB兩點
 */
export class Direction {
    public origin: Marker;
    public destination: Marker;
    constructor(origin, destination) {
        this.origin = origin;
        this.destination = destination;
    }
}