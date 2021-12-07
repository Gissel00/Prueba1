export class Hardware {
    "id": string;
    "fabricante": string;
    "modelo": string;
    "serviceTag": string;
    "ram": number;
    "procesadorMarca": string;
    "procesadorGeneracion": number;
    "procesadorFq": number;
    "cacheL1": number;
    "cacheL2": number;
    "cacheL3": number;
    "discoDuro": number;
    "discoDuroUnidad": string;
    "pantalla": number;
    "color": string
}

export class HardwareWithoutID {
    "fabricante": string;
    "modelo": string;
    "serviceTag": string;
    "ram": number;
    "procesadorMarca": string;
    "procesadorGeneracion": number;
    "procesadorFq": number;
    "cacheL1": number;
    "cacheL2": number;
    "cacheL3": number;
    "discoDuro": number;
    "discoDuroUnidad": string;
    "pantalla": number;
    "color": string
}
