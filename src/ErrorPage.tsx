import { Col } from "react-bootstrap";

function ErrorPage() {
  //   const error = useRouteError();
  //   console.error(error);

  return (
    <Col>
      <p>Oops!</p>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{/* <i>{error.statusText || error.message}</i> */}</p>
    </Col>
  );
}

export default ErrorPage;
