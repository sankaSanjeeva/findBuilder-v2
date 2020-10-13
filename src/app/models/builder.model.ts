export class Builder {
    name: Name;
    address: Address;
    city: string;
    telephone: string;
    stars: number;
    builderType: number;
    otherAbility: number[];
}

export class Name {
    first: string;
    last: string;
}

export class Address {
    line1: string;
    line2: string;
    line3: string;
}
