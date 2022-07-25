import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { useHistory } from "react-router-dom";

function DemoUser() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDemoUser = (e) => {
    e.preventDefault();

    const email = 'demo@aa.io';
    const password = 'password';

    dispatch(sessionActions.login(email, password ));
    history.push(`/discover`)

  }

  return (
    <button onClick={handleDemoUser}>Demo User</button>
  )
}

export default DemoUser;
