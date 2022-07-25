import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";


function DemoUser() {
  const dispatch = useDispatch();

  const handleDemoUser = (e) => {
    e.preventDefault();

    const email = 'demo@aa.io';
    const password = 'password';

    dispatch(sessionActions.login(email, password ));
  }

  return (
    <button onClick={handleDemoUser}>Demo User</button>
  )
}

export default DemoUser;
