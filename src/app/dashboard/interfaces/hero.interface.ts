// Generated by https://quicktype.io

export default interface HeroInterface {
    id                   : string;
    superhero            : string;
    publisher            : Publisher;
    alter_ego            : string;
    first_appearance     : string;
    characters           : string;
    alter_img           ?: string;
    _id                  : string;
    __v                  : string;
}

export enum Publisher {
    DCComics = "DC Comics",
    MarvelComics = "Marvel Comics",
}
