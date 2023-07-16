import styled from './Message.module.scss';
import { FacebookProvider, CustomChat    } from 'react-facebook';
function Message() {
    return (
        <div className={styled.message}>
          <FacebookProvider appId="571638541607385" chatSupport>
        <CustomChat pageId="104739217837031" minimized={false}/>
      </FacebookProvider>    
        </div>
    );
}

export default Message;
