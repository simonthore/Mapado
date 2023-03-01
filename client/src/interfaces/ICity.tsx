export default interface ICity {
    __typename?: string | undefined;
    id: number;
    name: string;
    latitude?: number | undefined | null;
    longitude?: number | null | undefined;
    // photo?: string;
    // users?: User[];
    // poi?: Poi[];
  }