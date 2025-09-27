import { Gender, RecommendationResult, ClothingRec, MakeupRec, BeardRec } from './types';

const CLOTHING_FALLBACK: ClothingRec = {
    colors: ['#3B82F6', '#6D28D9', '#F59E0B', '#E11D48'],
    styles: ['V-Necks', 'Crew Necks', 'Collared Shirts'],
    notes: "Focus on colors that complement your undertone and styles that frame your face."
};

const MAKEUP_FALLBACK: MakeupRec = {
    foundation: "Match foundation to your neck's skin tone for a natural look.",
    blush: "Apply blush to the apples of your cheeks for a healthy glow.",
    eyes: "Neutral eyeshadows can enhance your natural eye color.",
    lips: "A touch of lip balm or a nude lipstick is always a good choice.",
    notes: "General makeup guides to enhance your natural features."
};

const BEARD_FALLBACK: BeardRec = {
    styles: ["Short Stubble", "Full Beard", "Goatee"],
    notes: "Experiment with different beard styles to see what best suits your face shape."
};

export const getFallbackRecommendations = (gender: Gender): RecommendationResult => {
  const recommendations: RecommendationResult = { clothing: CLOTHING_FALLBACK };
  
  if (gender === Gender.Female || gender === Gender.NonBinary) {
    recommendations.makeup = MAKEUP_FALLBACK;
  }
  
  if (gender === Gender.Male || gender === Gender.NonBinary) {
    recommendations.beard = BEARD_FALLBACK;
  }
  
  return recommendations;
};
