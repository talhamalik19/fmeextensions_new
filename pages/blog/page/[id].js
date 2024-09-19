export default function Articles({ }) {
  return (
    <></>
  )
}

export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: `/blog`,
      permanent: true,
    },
  };
}