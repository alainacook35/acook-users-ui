import type { ReactNode } from "react";
import type { IPage, IUser } from "~/utils/interfaces";

export default function Table({ page }: { page: IPage<IUser> }) {
  return (
    <>
      <table style={{ height: "100%"}}>
        <thead>
          <tr className="table-header">
            <td>ID</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Email</td>
            <td>Profession</td>
            <td>City</td>
            <td>Country</td>
            <td>Date Created</td>
          </tr>
        </thead>
        <tbody>
          {page.content.map((user, index) => {
            return (
              <tr className={`table-row-${index}`}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.profession}</td>
                <td>{user.city}</td>
                <td>{user.country}</td>
                <td>{user.dateCreated}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
