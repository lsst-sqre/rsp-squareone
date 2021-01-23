/* Mock log in page */

import PropTypes from 'prop-types';
import { useState } from 'react';
import { useRouter } from 'next/router';
import sleep from '../utils/sleep';
import { getDevLoginEndpoint } from '../utils/client/url';

export default function Login({ baseUrl }) {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');

  const router = useRouter();
  const currentUrl = new URL(router.pathname, baseUrl);

  const handleSubmit = (event) => {
    // prevent default behaviour which refreshes the page
    event.preventDefault();
    const body = JSON.stringify({ name, username });
    fetch(getDevLoginEndpoint(currentUrl), {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => console.log(response))
      .then(sleep(100).then(() => window.location.assign('/')));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        Name
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <label htmlFor="username">
        Username:
        <input
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

Login.propTypes = {
  baseUrl: PropTypes.string,
};

export async function getServerSideProps({ req }) {
  const baseUrl = `http://${req.headers.host}`;
  return {
    props: {
      baseUrl,
    },
  };
}
