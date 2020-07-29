function sendEmails (emails) {
  return fetch(
    'https://frontend-homework.togglhire.vercel.app/api/send',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        emails
      })
    });
}

export { sendEmails };
