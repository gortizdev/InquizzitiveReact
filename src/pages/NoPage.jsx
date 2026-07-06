import { useNavigate } from "react-router-dom";

const NoPage = () => {
    const navigate = useNavigate();
    return (
      <div className="notfound">
        <h1>404</h1>
        <p>This page doesn&apos;t exist.</p>
        <button className="button" onClick={() => navigate('/')}>
          Back Home
        </button>
      </div>
    );
  };

  export default NoPage;
