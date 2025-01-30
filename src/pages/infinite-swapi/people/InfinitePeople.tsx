import Person from '@/pages/infinite-swapi/people/Person';

const initialUrl = 'https://swapi.py4e.com/api/people/';
const fetchUrl = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

export default function InfinitePeople() {
  return <></>;
}
