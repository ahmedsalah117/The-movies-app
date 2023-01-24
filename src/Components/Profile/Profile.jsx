import React from "react";

function Profile({ userData }) {
  let { first_name, last_name, age, email } = userData;

  return (
    <>
      <section className="text-center">
        <p className="pt-5">First Name: {first_name}</p>
        <p>Last Name: {last_name}</p>
        <p>Email: {email}</p>
        <p>Age: {age}</p>
      </section>
    </>
  );
}

export default Profile;
