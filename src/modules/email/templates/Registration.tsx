import { Button, Html } from '@react-email/components';
import * as React from 'react';

type Props = {
  username: string;
};

export function RegistrationEmail(props: Props) {
  const { username } = props;

  return (
    <Html lang="ru">
      <h1>Привет {username}!</h1>
      <p>Мы очень рады что именно Ты выбрал нас!</p>
      <p>Для дальнейшего использования сервиса подтверди регистрацию, перейдя по ссылке ниже</p>
      <Button>Click me</Button>
    </Html>
  );
}
