import { types } from "../constants";

export class RNG {
    constructor() {
    }

    generateNumber(n) {
        return Math.floor(Math.random() * (n + 1));
    }

    getType() {
        const typeId = this.generateNumber(types.length - 1);
        return types[typeId];
    }
}