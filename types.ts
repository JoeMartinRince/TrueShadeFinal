export enum Gender {
  Male = 'Male',
  Female = 'Female',
  NonBinary = 'Non-binary',
}

export interface AnalysisResult {
  skinTone: string;
  faceShape: string;
}

export interface ClothingRec {
  colors: string[];
  styles: string[];
  notes: string;
}

export interface MakeupRec {
  foundation: string;
  blush: string;
  eyes: string;
  lips: string;
  notes: string;
}

export interface BeardRec {
  styles: string[];
  notes: string;
}

export interface RecommendationResult {
  makeup?: MakeupRec;
  beard?: BeardRec;
  clothing: ClothingRec;
}
