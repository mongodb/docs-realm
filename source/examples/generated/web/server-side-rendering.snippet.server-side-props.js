export async function getServerSideProps(context) {
  const { accessToken } = nookies.get(context);
  const client = createClient(accessToken);
  const {
    data: { plant: lily },
  } = await client.query({
    query: GET_PLANT,
    variables: { name: "lily of the valley" },
  });

  return {
    props: { lily },
  };
}
