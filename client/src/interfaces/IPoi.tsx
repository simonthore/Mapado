export default interface IPoi {
  id: number;
  name: string;
  latitude?: number;
  longitude?: number;
  address?: string | null | undefined;
}
