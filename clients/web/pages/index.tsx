import React, { useEffect, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { JWTUser, Login } from "@upwardli/api";

import { getCoreAPIClient } from "@upwardli/shared/api";

interface Props {
  user: JWTUser;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const client = getCoreAPIClient();
  const login: Login = {
    email: "staff@upwardli.com",
    password: "upwardli",
  };
  const authResponse = await client.createLogin({ login: login });
  // FIXME bj 7/20/21 - API docs show this as returning a `Login` object, not a token's key
  // const token = authResponse.accessToken;
  return {
    props: { user: authResponse.user },
  };
};

export default function Home({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [userData, setUserData] = useState<JWTUser>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchUser() {
      const client = getCoreAPIClient();
      const login: Login = {
        email: "staff@upwardli.com",
        password: "upwardli",
      };
      const authResponse = await client.createLogin({ login: login });
      console.log(authResponse.user);
      setUserData(authResponse.user);
    }
    fetchUser();
  });
  return (
    <div className={styles.container}>
      <Head>
        <title>Hello World</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to upwardli, {user.firstName || user.username}!
        </h1>
        <h2>
          Welcome client fetched user,
          {userData && <span>{userData.firstName || userData.username}</span>}
          !;
        </h2>
      </main>
    </div>
  );
}
