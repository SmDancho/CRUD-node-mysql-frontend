import { FC } from 'react';
import { user } from '../../types';
export const Table: FC<user> = ({
  id,
  name,
  mail,
  registration_time,
  last_login_time,
  status,
}) => {
  const loginTime = new Date(String(last_login_time))
    .toLocaleDateString('en-US')
    .split('/');
  const registerTime = new Date(registration_time)
    .toLocaleDateString('en-US')
    .split('/');
  return (
    <div className="w-full ">
      <table className="flex justify-between m-auto tac">
        <tr className="w-[50px]">
          <td>{id}</td>
        </tr>
        <td className="w-[50px]">
          <tr>{name}</tr>
        </td>
        <td className="w-[125px]">
          <tr>{mail}</tr>
        </td>
        <td className="w-[188px]">
          <tr>{String(registerTime)}</tr>
        </td>
        <td className="w-[188px]">
          <tr>{String(loginTime)}</tr>
        </td>
        <td>
          <tr>{status}</tr>
        </td>
      </table>
    </div>
  );
};
