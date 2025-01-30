type searchParams = {
  msg: string;
};

export default function Login({
  searchParams,
}: {
  searchParams: searchParams;
}) {
  return (
    <>
      <h1>로그인</h1>
      <div>{searchParams.msg && searchParams.msg}</div>
    </>
  );
}
