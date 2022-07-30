import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NavBar from '../NavBar';
import './index.css'

function SplashPage() {
    const user = useSelector(state => state.session.user);

    // if (user) {
    //     return <Redirect to='/channels/@me' />
    // }

    return (
        <div className='splash-page'>
            <NavBar />
            <div className='image-container'>
                <div className='splash-image1'>
                    <h1>
                        IMAGINE A PLACE...
                    </h1>
                    <h2>
                        ...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.
                    </h2>
                </div>
                <div className='splash-image2'>
                    <h1>
                        Create an invite-only place where you belong
                    </h1>
                    <h2>
                        Accord servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat.
                    </h2>
                </div>
                <div className='splash-image3'>
                    <h1>
                        Where hanging out is easy
                    </h1>
                    <h2>
                        Grab a seat in a voice channel when you’re free. Friends in your server can see you’re around and instantly pop in to talk without having to call.
                    </h2>
                </div>
                <div className='splash-image4'>
                    <h1>
                        From few to a fandom
                    </h1>
                    <h2>
                        Get any community running with moderation tools and custom member access. Give members special powers, set up private channels, and more.
                    </h2>
                </div>
                <div className='splash-image5'>
                    <h1>
                        RELIABLE TECH FOR STAYING CLOSE
                    </h1>
                    <h2>
                        Low-latency voice and video feels like you’re in the same room. Wave hello over video, watch friends stream their games, or gather up and have a drawing session with screen share.
                    </h2>
                </div>
                <div className='splash-image6'>
                    <h1>
                        Ready to start your journey?
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default SplashPage;
