import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './index.css'

function SplashPage() {
    const user = useSelector(state => state.session.user);

    if (user) {
        return <Redirect to='/channels/@me' />
    }

    return (
        <div className='splash-page'>
            <div className='splash-page-text'>
                <h1>Hello World!</h1>
            </div>
        </div>
    )
}

export default SplashPage;
