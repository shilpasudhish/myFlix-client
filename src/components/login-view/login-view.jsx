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
function Loginview({ onLoggedIn }) {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  // Handle form submission
  const handlesubmit = (event) => {
    event.preventDefault();

    // Construct the URL with query parameters
    const url = new URL(
      "https://movie-flex-api-95d248252fac.herokuapp.com/login"
    );
    url.searchParams.append("username", Username);
    url.searchParams.append("password", Password);

    // Send POST request using fetch
    fetch(url, {
      method: "POST", // Make sure it's a POST request
      headers: {
        "Content-Type": "application/json", // Set Content-Type to application/json
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response", data);

        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <CardGroup>
            <Card>
              <Card.Header as="h5" className="text-center">
                Login
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handlesubmit}>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={Username}
                      onChange={(event) => setUsername(event.target.value)}
                      required
                      minLength={5}
                      placeholder="Enter your username"
                    />
                  </Form.Group>
                  <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={Password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                      required
                      placeholder="Enter your password"
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Login
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

export default Loginview;
