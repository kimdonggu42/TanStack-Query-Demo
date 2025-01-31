interface PersonProps {
  name: string;
  hairColor: string;
  eyeColor: string;
}

export default function Person({ name, hairColor, eyeColor }: PersonProps) {
  return (
    <li>
      <p>name : {name} </p>
      <p>hair : {hairColor}</p>
      <p>eyes : {eyeColor}</p>
    </li>
  );
}
