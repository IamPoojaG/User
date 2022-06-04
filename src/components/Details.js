import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";

const Profile = ({ user }) => {
  let navigate = useNavigate();
  let { id } = useParams();
  return (
    <>
      <div className="user">
        <div className="first">
          <button className="btn">
            <AiOutlineArrowLeft
              onClick={() => {
                navigate(`/users`);
              }}
            />
          </button>
          <h2>Details : {`${user[id - 1].first_name}`}</h2>
        </div>
        <div className="user_body">
          <ul>
            <li>
              First Name : <strong>{user[id - 1].first_name}</strong>
            </li>
            <li>
              Last Name : <strong>{user[id - 1].last_name}</strong>
            </li>
            <li>
              Company_Name : <strong>{user[id - 1].company_name}</strong>
            </li>
            <li>
              City : <strong>{user[id - 1].city}</strong>
            </li>
            <li>
              State : <strong>{user[id - 1].state}</strong>
            </li>
            <li>
              Zip : <strong>{user[id - 1].zip}</strong>
            </li>
            <li>
              Email : <strong>{user[id - 1].email}</strong>
            </li>
            <li>
              Web : <strong>{user[id - 1].web}</strong>
            </li>
            <li>
              Age : <strong>{user[id - 1].age}</strong>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Profile;
