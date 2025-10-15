import { createClient } from './server';

export const fetchHeroCarousel = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('hero_carousel')
    .select('*');

  if (error)
    throw new Error(
      'Failed to fetch hero carousel: ' + error.message
    );

  return data;
};
