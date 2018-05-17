export interface Beer {
  id: string;
  name: string;
  tagline: string;
  first_brewed: number;
  abv: number;
  ibu: number;
  ebc: number;
  description: string;
  brewers_tips: string;
  image_url: string;
  food_pairing: string[];
}