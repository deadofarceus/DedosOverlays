import { Button } from "react-bootstrap";

function Login({ clientID }: { clientID: string }) {
  return (
    <div className="powerpicks-login">
      <div className="powerpicks-header">
        <img
          src={"https://www.intel.com/content/dam/logos/intel-header-logo.svg"}
          alt="Intel"
          className="intel-logo"
        />
        <h1>Powerpicks - Login to start</h1>
      </div>
      <Button
        className="twitchLoginButton"
        href={`https://id.twitch.tv/oauth2/authorize?client_id=${clientID}&redirect_uri=https://${window.location.host}/Stream/Powerpicks&response_type=token&scope=chat:read`}
        aria-label="Login with Twitch"
      >
        <span className="twitchIcon" aria-hidden>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 2H18V12.5L13 17.5H9.5L7 20H5V17.5H1V4L3 2ZM16 11.5V4H5V14H8V16.5L10.5 14H14.5L16 12.5V11.5ZM12.5 5.5H14V10H12.5V5.5ZM9.5 5.5H11V10H9.5V5.5Z"
              fill="currentColor"
            />
          </svg>
        </span>
        Login with Twitch
      </Button>
    </div>
  );
}

export default Login;
