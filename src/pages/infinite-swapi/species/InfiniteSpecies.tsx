import Species from '@/pages/infinite-swapi/species/Species';

const initialUrl = 'https://swapi.py4e.com/api/species/';
const fetchUrl = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

export default function InfiniteSpecies() {
  return <></>;
}
