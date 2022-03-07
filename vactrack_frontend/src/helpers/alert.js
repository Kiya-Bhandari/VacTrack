import { Row, Col, Alert } from "react-bootstrap";

export const successMessage = (success = true, message) => {
  return (
    <Row>
      <Col>
        <Alert
          show={success}
          variant="success"
          // onClose={() => setSuccess(false)}
          // dismissible
        >
          {message}
        </Alert>
      </Col>
    </Row>
  );
};

export const errorMessage = (error = true, message) => {
  return (
    <Row>
      <Col>
        <Alert
          show={error}
          variant="danger"
          //   onClose={() => setError(false)}
          // dismissible
        >
          {message}
        </Alert>
      </Col>
    </Row>
  );
};
