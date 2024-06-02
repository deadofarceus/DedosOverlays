import { Col, Container, Form, Row } from "react-bootstrap";
import { SKILLS, Streamer } from "../../types/GamingTierlistTypes";

function Profile({ name, id, values, callback }: Streamer) {
  const handleSliderChange = (index: number, value: number) => {
    const newValues = [...values];
    newValues[index] = value;
    localStorage.setItem("gamingtierlist" + id, JSON.stringify(newValues));
    callback(newValues);
  };

  const link = id.startsWith("https")
    ? id
    : `https://static-cdn.jtvnw.net/jtv_user_pictures/${id}-profile_image-300x300.png`;

  return (
    <Container className="centerC profileC">
      <Col className="w-100" xs={12} md={6}>
        <img src={link} alt="Placeholder" className="img-fluid profilePic" />
        <h1>{name}</h1>
        <Col className="sliderC centerC">
          {SKILLS.map(
            (value, index) =>
              index % 2 === 0 && (
                <Row
                  className="centerR justify-content-sm-between w-100"
                  md="auto"
                >
                  <Form.Group className="skillGroup" key={index}>
                    <Form.Label className="formlabel">{value}</Form.Label>
                    <div className="sliderLabels">
                      {[0, 5].map((value) => (
                        <span key={value}>{value}</span>
                      ))}
                    </div>
                    <Form.Range
                      max={6}
                      min={1}
                      step={1}
                      defaultValue={1}
                      className="gameSlider"
                      onChange={(event) => {
                        handleSliderChange(index, parseInt(event.target.value));
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="skillGroup" key={index + 1}>
                    <Form.Label className="formlabel">
                      {SKILLS[index + 1]}
                    </Form.Label>
                    <div className="sliderLabels">
                      {[0, 5].map((value) => (
                        <span>{value}</span>
                      ))}
                    </div>
                    <Form.Range
                      max={6}
                      min={1}
                      step={1}
                      defaultValue={1}
                      className="gameSlider"
                      onChange={(event) => {
                        handleSliderChange(
                          index + 1,
                          parseInt(event.target.value)
                        );
                      }}
                    />
                  </Form.Group>
                </Row>
              )
          )}
        </Col>
      </Col>
    </Container>
  );
}

export default Profile;
