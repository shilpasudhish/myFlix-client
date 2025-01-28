import { useState } from "react";
import {
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
} from "react-bootstrap";

function Signupview() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleclick = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
      email: email,
      birthday: birthday,
    };

    fetch("https://movie-flex-api-95d248252fac.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    });
  };
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <CardGroup>
            <Card>
              <Card.Header as="h5" className="text-center">
                Register as a new user
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleclick}>
                  <Form.Group controlId="signUpFormUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                      required
                      minLength={5}
                      placeholder="Enter you username"
                    />
                  </Form.Group>
                  <Form.Group controlId="signUpFormPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                      required
                      placeholder="Enter your password"
                    />
                  </Form.Group>
                  <Form.Group controlId="signUpFormEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                      required
                      placeholder="Enter you email address"
                    />
                  </Form.Group>
                  <Form.Group controlId="signUpFormBirthday">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type="date"
                      value={birthday}
                      onChange={(event) => {
                        setBirthday(event.target.value);
                      }}
                      required
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default Signupview;
