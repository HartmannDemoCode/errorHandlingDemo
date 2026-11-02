import { Link, useOutletContext } from "react-router";
import AuthHookDemo from "../assets/components/AuthHookDemo";

export default function AuthDemoPage() {
  const { auth } = useOutletContext();

  return (
    <div className="auth-demo-page">
      <Link to="/" className="auth-demo-back-link">
        Back to main demo
      </Link>

      <AuthHookDemo auth={auth} />
    </div>
  );
}
