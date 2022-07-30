import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { useHistory } from "react-router-dom";

function DemoUser() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDemoUser = async (e) => {
    e.preventDefault();

    const email = 'demo@aa.io';
    const password = 'password';

    await dispatch(sessionActions.login(email, password ));
    history.push('/channels/@me')

  }

  return (
    <button className='log-in-splash-btn' onClick={handleDemoUser}>Demo</button>
  )
}

export default DemoUser;
